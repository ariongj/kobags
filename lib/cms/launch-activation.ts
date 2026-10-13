// A one-time, owner-approved operator action, outside schema migrations.
// The persisted event keeps later CMS changes authoritative across deploys.
export const inquiryActivationFlag = '2026-10-14';
const marker = 'launch-live-inquiries-20261014';
const eligible = `id='global-settings' AND kind='settings' AND archived=0
 AND json_valid(draft) AND json_valid(published)
 AND json_type(draft,'$.settings')='object' AND json_type(published,'$.settings')='object'
 AND NOT EXISTS(SELECT 1 FROM cms_events WHERE id='${marker}')`;
const needsChange = `(json_extract(draft,'$.settings.liveInquiries') IS NOT 1 OR json_extract(published,'$.settings.liveInquiries') IS NOT 1)`;

export const inquiryActivationStatements = [
  `INSERT OR IGNORE INTO cms_versions(id,record_id,revision,data,actor,action,created_at)
   SELECT '${marker}-draft',id,revision,draft,'site-operator','before-live-inquiry-activation-draft',strftime('%Y-%m-%dT%H:%M:%fZ','now')
   FROM cms_records WHERE ${eligible} AND ${needsChange}`,
  `INSERT OR IGNORE INTO cms_versions(id,record_id,revision,data,actor,action,created_at)
   SELECT '${marker}-published',id,revision,published,'site-operator','before-live-inquiry-activation-published',strftime('%Y-%m-%dT%H:%M:%fZ','now')
   FROM cms_records WHERE ${eligible} AND ${needsChange}`,
  `UPDATE cms_records SET draft=json_set(draft,'$.settings.liveInquiries',json('true')),
   published=json_set(published,'$.settings.liveInquiries',json('true')),revision=revision+1,
   mutation='${marker}',updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
   WHERE ${eligible} AND ${needsChange}`,
  `INSERT OR IGNORE INTO cms_events(id,entity_id,actor,action,detail,created_at)
   SELECT '${marker}',id,'site-operator','live-inquiries-activated',
   'Owner-approved launch activation. Customer requests save to the shared CMS inbox; staff check it manually. Automatic email delivery is not activated.',
   strftime('%Y-%m-%dT%H:%M:%fZ','now') FROM cms_records WHERE ${eligible}`,
];

let pending: Promise<boolean> | undefined;
export async function activateInquiriesForLaunch(database: D1Database, flag: string | undefined) {
  if (flag !== inquiryActivationFlag) return;
  if (!pending) {
    pending = (async () => {
      const existing = await database.prepare('SELECT id FROM cms_events WHERE id=?').bind(marker).first();
      if (existing) return true;
      // D1 batches are atomic; concurrent requests cannot apply the action twice.
      await database.batch(inquiryActivationStatements.map(sql => database.prepare(sql)));
      return !!await database.prepare('SELECT id FROM cms_events WHERE id=?').bind(marker).first();
    })();
  }
  try {
    if (!await pending) pending = undefined; // A fresh/unpublished CMS may be initialized later.
  } catch (error) {
    pending = undefined;
    throw error;
  }
}

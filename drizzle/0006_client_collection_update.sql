-- Client instructions, 21 October: Smiley temporarily unavailable; use the
-- supplied Thank you photograph. Preserve all other content and retain history.
-- The event guard lets staff restore stock later without a deploy reverting it.
INSERT OR IGNORE INTO cms_versions(id,record_id,revision,data,actor,action,created_at)
SELECT 'collections-20261021-draft-'||id,id,revision,draft,'site-release','before-client-collection-update',strftime('%Y-%m-%dT%H:%M:%fZ','now')
FROM cms_records WHERE kind='collection' AND slug IN ('smiley','thank-you') AND archived=0 AND json_valid(draft)
AND NOT EXISTS(SELECT 1 FROM cms_events WHERE id='collections-20261021-'||cms_records.id);
--> statement-breakpoint
INSERT OR IGNORE INTO cms_versions(id,record_id,revision,data,actor,action,created_at)
SELECT 'collections-20261021-published-'||id,id,revision,published,'site-release','before-client-collection-update',strftime('%Y-%m-%dT%H:%M:%fZ','now')
FROM cms_records WHERE kind='collection' AND slug IN ('smiley','thank-you') AND archived=0 AND json_valid(published)
AND NOT EXISTS(SELECT 1 FROM cms_events WHERE id='collections-20261021-'||cms_records.id);
--> statement-breakpoint
UPDATE cms_records SET
 draft=CASE WHEN slug='thank-you' THEN json_set(draft,'$.image','/assets/client-2026-10/thank-you-stock.jpg')
   WHEN json_type(draft,'$.collection.variants')='array' THEN json_set(draft,'$.collection.variants',
     (SELECT json_group_array(json_set(value,'$.status','out')) FROM json_each(cms_records.draft,'$.collection.variants')))
   ELSE draft END,
 published=CASE WHEN published IS NULL THEN NULL
   WHEN slug='thank-you' THEN json_set(published,'$.image','/assets/client-2026-10/thank-you-stock.jpg')
   WHEN json_type(published,'$.collection.variants')='array' THEN json_set(published,'$.collection.variants',
     (SELECT json_group_array(json_set(value,'$.status','out')) FROM json_each(cms_records.published,'$.collection.variants')))
   ELSE published END,
 revision=revision+1,mutation='client-collections-20261021',updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')
WHERE kind='collection' AND slug IN ('smiley','thank-you') AND archived=0 AND json_valid(draft)
AND (published IS NULL OR json_valid(published))
AND NOT EXISTS(SELECT 1 FROM cms_events WHERE id='collections-20261021-'||cms_records.id);
--> statement-breakpoint
INSERT OR IGNORE INTO cms_events(id,entity_id,actor,action,detail,created_at)
SELECT 'collections-20261021-'||id,id,'site-release','client-collection-update',
 CASE WHEN slug='smiley' THEN 'Client confirmed Smiley temporarily out of stock. All current variants marked out; staff may restore availability in CMS.'
 ELSE 'Client supplied the original Thank you stock photograph. No GSM, bag color, print-color availability or dimensions inferred from the photograph.' END,
 strftime('%Y-%m-%dT%H:%M:%fZ','now')
FROM cms_records WHERE kind='collection' AND slug IN ('smiley','thank-you') AND mutation='client-collections-20261021';

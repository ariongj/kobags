import { db } from './core';
export async function reports(){
 const [byKind,byStatus,byBag,byLocation,quotes,response]=await Promise.all([
  db().prepare('SELECT kind AS label,COUNT(*) AS count FROM cms_inquiries GROUP BY kind ORDER BY count DESC').all(),
  db().prepare('SELECT status AS label,COUNT(*) AS count FROM cms_inquiries GROUP BY status ORDER BY count DESC').all(),
  db().prepare("SELECT COALESCE(json_extract(data,'$.productName'),'Not specified') AS label,COUNT(*) AS count FROM cms_inquiries WHERE kind='quote' GROUP BY label ORDER BY count DESC").all(),
  db().prepare("SELECT json_extract(data,'$.country') AS country,json_extract(data,'$.city') AS city,COUNT(*) AS count FROM cms_inquiries GROUP BY country,city ORDER BY count DESC").all(),
  db().prepare('SELECT status AS label,COUNT(*) AS count FROM cms_quotes q WHERE version=(SELECT MAX(version) FROM cms_quotes WHERE inquiry_id=q.inquiry_id) GROUP BY status').all(),
  db().prepare("SELECT AVG((julianday(first_action)-julianday(created_at))*24) AS hours,COUNT(first_action) AS responded FROM (SELECT i.created_at,(SELECT MIN(e.created_at) FROM cms_events e WHERE e.entity_id=i.id AND e.actor!='customer' AND e.action IN ('inquiry-updated','private-note','quote-created')) AS first_action FROM cms_inquiries i)").first(),
 ]);return {byKind:byKind.results,byStatus:byStatus.results,byBag:byBag.results,byLocation:byLocation.results,quotes:quotes.results,response};
}

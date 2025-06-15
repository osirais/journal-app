CREATE OR REPLACE FUNCTION get_journals_with_entry_count(uid UUID)
RETURNS TABLE (
  id UUID,
  author_id UUID,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  color_hex CHAR(7),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  entries INTEGER
)
AS $$
  SELECT
    j.id,
    j.author_id,
    j.title,
    j.description,
    j.thumbnail_url,
    j.color_hex,
    j.created_at,
    j.updated_at,
    COUNT(e.id)::INT AS entries
  FROM journal j
  LEFT JOIN entry e
    ON e.journal_id = j.id
  WHERE j.author_id = uid
  GROUP BY j.id,
           j.author_id,
           j.title,
           j.description,
           j.thumbnail_url,
           j.color_hex,
           j.created_at,
           j.updated_at
  ORDER BY j.created_at DESC
$$ LANGUAGE SQL STABLE;


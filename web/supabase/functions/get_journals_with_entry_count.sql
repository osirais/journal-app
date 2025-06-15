CREATE OR REPLACE FUNCTION get_journals_with_entry_count(
  uid UUID,
  sort_by TEXT
)
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
DECLARE
  order_clause TEXT;
BEGIN
  CASE sort_by
    WHEN 'newest' THEN
      order_clause := 'j.created_at DESC';
    WHEN 'oldest' THEN
      order_clause := 'j.created_at ASC';
    WHEN 'most-updated' THEN
      order_clause := 'j.updated_at DESC';
    WHEN 'least-updated' THEN
      order_clause := 'j.updated_at ASC';
    WHEN 'most-entries' THEN
      order_clause := 'entries DESC';
    ELSE
      RAISE EXCEPTION 'Invalid sort option: %', sort_by;
  END CASE;

  RETURN QUERY EXECUTE format(
    $f$
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
    WHERE j.author_id = $1
    GROUP BY j.id,
             j.author_id,
             j.title,
             j.description,
             j.thumbnail_url,
             j.color_hex,
             j.created_at,
             j.updated_at
    ORDER BY %s
    $f$,
    order_clause
  )
  USING uid;
END;
$$ LANGUAGE plpgsql STABLE;


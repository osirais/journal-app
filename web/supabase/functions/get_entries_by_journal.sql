CREATE OR REPLACE FUNCTION get_entries_by_journal(
  uid UUID,
  journal_id_param UUID,
  sort_by TEXT
)
RETURNS TABLE (
  id UUID,
  journal_id UUID,
  content TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  entry_tags JSONB
)
AS $$
DECLARE
  order_clause TEXT;
BEGIN
  CASE sort_by
    WHEN 'newest' THEN
      order_clause := 'e.created_at DESC';
    WHEN 'oldest' THEN
      order_clause := 'e.created_at ASC';
    ELSE
      RAISE EXCEPTION 'Invalid sort option: %', sort_by;
  END CASE;

  RETURN QUERY EXECUTE format(
    $f$
    SELECT
      e.id,
      e.journal_id,
      e.content,
      e.created_at,
      e.updated_at,
      (
        SELECT jsonb_agg(jsonb_build_object('id', t.id, 'name', t.name))
        FROM entry_tag et
        JOIN tag t ON t.id = et.tag_id
        WHERE et.entry_id = e.id
      ) AS entry_tags
    FROM entry e
    JOIN journal j ON j.id = e.journal_id
    WHERE e.journal_id = $2
      AND j.author_id = $1
    ORDER BY %s
    $f$,
    order_clause
  )
  USING uid, journal_id_param;
END;
$$ LANGUAGE plpgsql STABLE;


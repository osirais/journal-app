create or replace function get_journals_with_entry_count(uid uuid)
returns table (
  id uuid,
  author_id uuid,
  title text,
  description text,
  thumbnail_url text,
  created_at timestamptz,
  updated_at timestamptz,
  deleted_at timestamptz,
  entries integer
)
as $$
  select
    j.*,
    count(e.id)::int as entries
  from journal j
  left join entry e
    on e.journal_id = j.id and e.deleted_at is null
  where j.author_id = uid and j.deleted_at is null
  group by j.id
  order by j.created_at desc
$$ language sql stable;

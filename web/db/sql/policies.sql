ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry ENABLE ROW LEVEL SECURITY;
ALTER TABLE tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE entry_tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_balance ENABLE ROW LEVEL SECURITY;
ALTER TABLE balance_transaction ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reason ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their own non-deleted user row"
  ON users FOR ALL
  USING (
    id = (SELECT auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can access their own non-deleted journals"
  ON journal FOR ALL
  USING (
    author_id = (SELECT auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can access their own non-deleted entries"
  ON entry FOR ALL
  USING (
    journal_id IN (
      SELECT id FROM journal WHERE author_id = (SELECT auth.uid())
    )
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can access their own non-deleted tags"
  ON tag FOR ALL
  USING (
    user_id = (SELECT auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can access entry_tag of their own entries"
  ON entry_tag FOR ALL
  USING (
    entry_id IN (
      SELECT e.id
      FROM entry e
      JOIN journal j ON e.journal_id = j.id
      WHERE j.author_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Users can access their own non-deleted balances"
  ON user_balance FOR ALL
  USING (
    user_id = (SELECT auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can access their own balance transactions"
  ON balance_transaction FOR ALL
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can access their own non-deleted settings"
  ON user_settings FOR ALL
  USING (
    user_id = (SELECT auth.uid())
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can access their own non-deleted reasons"
  ON reason FOR ALL
  USING (
    user_id = (SELECT auth.uid())
    AND deleted_at IS NULL
  );
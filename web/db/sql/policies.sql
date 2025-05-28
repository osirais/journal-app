ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their own user row"
  ON users FOR ALL
  USING (id = auth.uid());

CREATE POLICY "Only allow access to non-deleted rows"
  ON users FOR ALL
  USING (deleted_at IS NULL);

ALTER TABLE journal ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their own journals"
  ON journal FOR ALL
  USING (author_id = auth.uid());

CREATE POLICY "Only allow access to non-deleted rows"
  ON journal FOR ALL
  USING (deleted_at IS NULL);

ALTER TABLE entry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access entries of their journals"
  ON entry FOR ALL
  USING (
    journal_id IN (
      SELECT id FROM journal WHERE author_id = auth.uid()
    )
  );

CREATE POLICY "Only allow access to non-deleted rows"
  ON entry FOR ALL
  USING (deleted_at IS NULL);

ALTER TABLE tag ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their own tags"
  ON tag FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Only allow access to non-deleted rows"
  ON tag FOR ALL
  USING (deleted_at IS NULL);

ALTER TABLE entry_tag ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access entry_tag of their own entries"
  ON entry_tag FOR ALL
  USING (
    entry_id IN (
      SELECT e.id
      FROM entry e
      JOIN journal j ON e.journal_id = j.id
      WHERE j.author_id = auth.uid()
    )
  );

ALTER TABLE user_balance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their own balance"
  ON user_balance FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Only allow access to non-deleted rows"
  ON user_balance FOR ALL
  USING (deleted_at IS NULL);

ALTER TABLE balance_transaction ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their own balance transactions"
  ON balance_transaction FOR ALL
  USING (user_id = auth.uid());

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can access their settings"
  ON user_settings FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Only allow access to non-deleted rows"
  ON user_settings FOR ALL
  USING (deleted_at IS NULL);
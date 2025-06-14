ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own user row" ON users;
CREATE POLICY "Users can access their own user row"
  ON users FOR ALL
  USING (
    id = (SELECT auth.uid())
  );

ALTER TABLE journal ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own journals" ON journal;
CREATE POLICY "Users can access their own journals"
  ON journal FOR ALL
  USING (
    author_id = (SELECT auth.uid())
  );

ALTER TABLE entry ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own entries" ON entry;
CREATE POLICY "Users can access their own entries"
  ON entry FOR ALL
  USING (
    journal_id IN (
      SELECT id FROM journal WHERE author_id = (SELECT auth.uid())
    )
  );

ALTER TABLE tag ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own tags" ON tag;
CREATE POLICY "Users can access their own tags"
  ON tag FOR ALL
  USING (
    user_id = (SELECT auth.uid())
  );

ALTER TABLE entry_tag ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access entry_tag of their own entries" ON entry_tag;
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

ALTER TABLE user_balance ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own balances" ON user_balance;
CREATE POLICY "Users can access their own balances"
  ON user_balance FOR ALL
  USING (
    user_id = (SELECT auth.uid())
  );

ALTER TABLE balance_transaction ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own balance transactions" ON balance_transaction;
CREATE POLICY "Users can access their own balance transactions"
  ON balance_transaction FOR ALL
  USING (user_id = (SELECT auth.uid()));

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own settings" ON user_settings;
CREATE POLICY "Users can access their own settings"
  ON user_settings FOR ALL
  USING (
    user_id = (SELECT auth.uid())
  );

ALTER TABLE reason ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own reasons" ON reason;
CREATE POLICY "Users can access their own reasons"
  ON reason FOR ALL
  USING (
    user_id = (SELECT auth.uid())
  );

ALTER TABLE mood_entry ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own mood entries" ON mood_entry;
CREATE POLICY "Users can access their own mood entries"
  ON mood_entry FOR ALL
  USING (
    user_id = (SELECT auth.uid())
  );

ALTER TABLE streak ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can access their own streaks" ON streak;
CREATE POLICY "Users can access their own streaks"
  ON streak FOR ALL
  USING (
    user_id = (SELECT auth.uid())
  );
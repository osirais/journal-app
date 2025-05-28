CREATE EXTENSION IF NOT EXISTS citext SCHEMA extensions;

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    username CITEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT username_length CHECK (length(username) BETWEEN 3 and 32),
    CONSTRAINT username_allowed_chars CHECK (username ~* '^[a-z0-9._-]*$')
);

CREATE TABLE IF NOT EXISTS journal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    author_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS entry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    journal_id UUID NOT NULL REFERENCES journal(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS tag (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES users(id),
    name CITEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT user_tag_unique UNIQUE(user_id, name)
);

CREATE TABLE IF NOT EXISTS entry_tag (
    entry_id UUID NOT NULL REFERENCES entry(id),
    tag_id UUID NOT NULL REFERENCES tag(id),
    PRIMARY KEY (entry_id, tag_id)
);

CREATE TABLE IF NOT EXISTS user_balance (
    user_id UUID NOT NULL REFERENCES users(id),
    currency TEXT NOT NULL,
    balance INT8 NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, currency)
);

CREATE TABLE IF NOT EXISTS balance_transaction (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL,
    currency TEXT NOT NULL,
    amount INT8 NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (user_id, currency)
        REFERENCES user_balance(user_id, currency)
);

CREATE OR REPLACE VIEW users_with_stamps
WITH (security_invoker = on) AS
SELECT
    u.*,
    COALESCE(b.balance, 0) AS stamps
FROM users u
LEFT JOIN user_balance b
    ON b.user_id = u.id
   AND b.currency = 'stamps';

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_type WHERE typname = 'task_interval'
  ) THEN
    CREATE TYPE task_interval AS ENUM ('daily', 'weekly', 'monthly');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS task (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    description TEXT,
    interval task_interval NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mood_entry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES users(id),
    scale INT NOT NULL CHECK (scale BETWEEN 1 AND 5),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    theme JSONB NOT NULL DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ
);

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_type WHERE typname = 'streak_category'
  ) THEN
    CREATE TYPE streak_category AS ENUM ('journal_entries', 'mood_entries');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS streak (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
    user_id UUID NOT NULL REFERENCES users(id),
    category streak_category NOT NULL,
    current_streak INT NOT NULL DEFAULT 0,
    longest_streak INT NOT NULL DEFAULT 0,
    last_completed_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT user_category_unique UNIQUE(user_id, category)
);

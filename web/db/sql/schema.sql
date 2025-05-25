CREATE EXTENSION IF NOT EXISTS citext;

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
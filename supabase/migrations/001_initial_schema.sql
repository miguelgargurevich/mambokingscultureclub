-- ============================================
-- MAMBO KING CULTURE CLUB - Database Schema
-- Initial Migration
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('member', 'moderator', 'admin');
CREATE TYPE post_type AS ENUM ('text', 'image', 'audio', 'video');
CREATE TYPE post_visibility AS ENUM ('public', 'club-only');
CREATE TYPE rsvp_status AS ENUM ('attending', 'maybe', 'cancel');

-- ============================================
-- TABLES
-- ============================================

-- Users table (extends Supabase Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    display_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'member',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_invited BOOLEAN DEFAULT FALSE,
    social_links JSONB DEFAULT '{}',
    stats JSONB DEFAULT '{"posts_count": 0, "likes_received": 0, "events_hosted": 0}'
);

-- Posts table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_urls TEXT[] DEFAULT '{}',
    type post_type DEFAULT 'text',
    visibility post_visibility DEFAULT 'club-only',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}'
);

-- Comments table
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes table
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Events table
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ,
    location TEXT,
    location_url TEXT,
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    capacity INTEGER,
    rsvps_count INTEGER DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVPs table
CREATE TABLE rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status rsvp_status DEFAULT 'attending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Invites table
CREATE TABLE invites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    used_by UUID REFERENCES users(id),
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    used_at TIMESTAMPTZ,
    max_uses INTEGER DEFAULT 1,
    use_count INTEGER DEFAULT 0
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_visibility ON posts(visibility);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);

CREATE INDEX idx_comments_post ON comments(post_id);
CREATE INDEX idx_comments_author ON comments(author_id);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);

CREATE INDEX idx_likes_post ON likes(post_id);
CREATE INDEX idx_likes_user ON likes(user_id);

CREATE INDEX idx_events_host ON events(host_id);
CREATE INDEX idx_events_start_at ON events(start_at);

CREATE INDEX idx_rsvps_event ON rsvps(event_id);
CREATE INDEX idx_rsvps_user ON rsvps(user_id);

CREATE INDEX idx_invites_code ON invites(code);
CREATE INDEX idx_invites_expires ON invites(expires_at);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Increment likes count
CREATE OR REPLACE FUNCTION increment_likes(target_post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = target_post_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement likes count
CREATE OR REPLACE FUNCTION decrement_likes(target_post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = target_post_id;
END;
$$ LANGUAGE plpgsql;

-- Increment replies count
CREATE OR REPLACE FUNCTION increment_replies(target_post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE posts SET replies_count = replies_count + 1 WHERE id = target_post_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement replies count
CREATE OR REPLACE FUNCTION decrement_replies(target_post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE posts SET replies_count = GREATEST(replies_count - 1, 0) WHERE id = target_post_id;
END;
$$ LANGUAGE plpgsql;

-- Increment RSVP count
CREATE OR REPLACE FUNCTION increment_rsvps(target_event_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE events SET rsvps_count = rsvps_count + 1 WHERE id = target_event_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement RSVP count
CREATE OR REPLACE FUNCTION decrement_rsvps(target_event_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE events SET rsvps_count = GREATEST(rsvps_count - 1, 0) WHERE id = target_event_id;
END;
$$ LANGUAGE plpgsql;

-- Handle new user creation from auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated at triggers
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
    BEFORE UPDATE ON events
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rsvps_updated_at
    BEFORE UPDATE ON rsvps
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Likes triggers for count management
CREATE OR REPLACE FUNCTION handle_like_insert()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM increment_likes(NEW.post_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_like_delete()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM decrement_likes(OLD.post_id);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_like_insert
    AFTER INSERT ON likes
    FOR EACH ROW
    EXECUTE FUNCTION handle_like_insert();

CREATE TRIGGER on_like_delete
    AFTER DELETE ON likes
    FOR EACH ROW
    EXECUTE FUNCTION handle_like_delete();

-- Comments triggers for count management
CREATE OR REPLACE FUNCTION handle_comment_insert()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM increment_replies(NEW.post_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION handle_comment_delete()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM decrement_replies(OLD.post_id);
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_comment_insert
    AFTER INSERT ON comments
    FOR EACH ROW
    EXECUTE FUNCTION handle_comment_insert();

CREATE TRIGGER on_comment_delete
    AFTER DELETE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION handle_comment_delete();

-- RSVP triggers for count management
CREATE OR REPLACE FUNCTION handle_rsvp_change()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'attending' THEN
        PERFORM increment_rsvps(NEW.event_id);
    ELSIF TG_OP = 'DELETE' AND OLD.status = 'attending' THEN
        PERFORM decrement_rsvps(OLD.event_id);
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status = 'attending' AND NEW.status != 'attending' THEN
            PERFORM decrement_rsvps(NEW.event_id);
        ELSIF OLD.status != 'attending' AND NEW.status = 'attending' THEN
            PERFORM increment_rsvps(NEW.event_id);
        END IF;
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_rsvp_change
    AFTER INSERT OR UPDATE OR DELETE ON rsvps
    FOR EACH ROW
    EXECUTE FUNCTION handle_rsvp_change();

-- Auth trigger for new user
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

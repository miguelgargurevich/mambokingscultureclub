-- ============================================
-- MAMBO KING CULTURE CLUB - RLS Policies
-- Row Level Security
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS POLICIES
-- ============================================

-- Anyone can view user profiles
CREATE POLICY "Users are viewable by everyone"
    ON users FOR SELECT
    USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Only admins can delete users
CREATE POLICY "Admins can delete users"
    ON users FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ============================================
-- POSTS POLICIES
-- ============================================

-- Public posts are viewable by everyone
CREATE POLICY "Public posts are viewable by everyone"
    ON posts FOR SELECT
    USING (visibility = 'public');

-- Club-only posts require authentication
CREATE POLICY "Club posts viewable by authenticated users"
    ON posts FOR SELECT
    USING (
        visibility = 'club-only' AND auth.uid() IS NOT NULL
    );

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
    ON posts FOR INSERT
    WITH CHECK (auth.uid() = author_id);

-- Authors can update their own posts
CREATE POLICY "Authors can update own posts"
    ON posts FOR UPDATE
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

-- Authors can delete their own posts
CREATE POLICY "Authors can delete own posts"
    ON posts FOR DELETE
    USING (auth.uid() = author_id);

-- Moderators and admins can delete any post
CREATE POLICY "Moderators can delete any post"
    ON posts FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('moderator', 'admin')
        )
    );

-- ============================================
-- COMMENTS POLICIES
-- ============================================

-- Comments are viewable on viewable posts
CREATE POLICY "Comments viewable on viewable posts"
    ON comments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM posts
            WHERE posts.id = comments.post_id
            AND (
                posts.visibility = 'public'
                OR (posts.visibility = 'club-only' AND auth.uid() IS NOT NULL)
            )
        )
    );

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments"
    ON comments FOR INSERT
    WITH CHECK (auth.uid() = author_id);

-- Authors can update their own comments
CREATE POLICY "Authors can update own comments"
    ON comments FOR UPDATE
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

-- Authors can delete their own comments
CREATE POLICY "Authors can delete own comments"
    ON comments FOR DELETE
    USING (auth.uid() = author_id);

-- Moderators and admins can delete any comment
CREATE POLICY "Moderators can delete any comment"
    ON comments FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('moderator', 'admin')
        )
    );

-- ============================================
-- LIKES POLICIES
-- ============================================

-- Likes are viewable by everyone
CREATE POLICY "Likes are viewable by everyone"
    ON likes FOR SELECT
    USING (true);

-- Authenticated users can like posts
CREATE POLICY "Authenticated users can like posts"
    ON likes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can remove their own likes
CREATE POLICY "Users can remove own likes"
    ON likes FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- EVENTS POLICIES
-- ============================================

-- Events are viewable by everyone
CREATE POLICY "Events are viewable by everyone"
    ON events FOR SELECT
    USING (true);

-- Authenticated users can create events
CREATE POLICY "Authenticated users can create events"
    ON events FOR INSERT
    WITH CHECK (auth.uid() = host_id);

-- Hosts can update their own events
CREATE POLICY "Hosts can update own events"
    ON events FOR UPDATE
    USING (auth.uid() = host_id)
    WITH CHECK (auth.uid() = host_id);

-- Hosts can delete their own events
CREATE POLICY "Hosts can delete own events"
    ON events FOR DELETE
    USING (auth.uid() = host_id);

-- Moderators and admins can manage any event
CREATE POLICY "Moderators can manage any event"
    ON events FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('moderator', 'admin')
        )
    );

-- ============================================
-- RSVPS POLICIES
-- ============================================

-- RSVPs are viewable by event host and attendee
CREATE POLICY "RSVPs viewable by relevant parties"
    ON rsvps FOR SELECT
    USING (
        auth.uid() = user_id
        OR EXISTS (
            SELECT 1 FROM events
            WHERE events.id = rsvps.event_id
            AND events.host_id = auth.uid()
        )
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('moderator', 'admin')
        )
    );

-- Authenticated users can RSVP
CREATE POLICY "Authenticated users can RSVP"
    ON rsvps FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own RSVP
CREATE POLICY "Users can update own RSVP"
    ON rsvps FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can delete their own RSVP
CREATE POLICY "Users can delete own RSVP"
    ON rsvps FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- INVITES POLICIES
-- ============================================

-- Invites viewable by creator and admins
CREATE POLICY "Invites viewable by creator and admins"
    ON invites FOR SELECT
    USING (
        auth.uid() = created_by
        OR EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Moderators and admins can create invites
CREATE POLICY "Moderators and admins can create invites"
    ON invites FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role IN ('moderator', 'admin')
        )
    );

-- Admins can delete invites
CREATE POLICY "Admins can delete invites"
    ON invites FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Allow checking invite codes (for signup)
CREATE POLICY "Anyone can check invite codes"
    ON invites FOR SELECT
    USING (true);

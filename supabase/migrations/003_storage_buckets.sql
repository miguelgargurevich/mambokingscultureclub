-- ============================================
-- MAMBO KING CULTURE CLUB - Storage Buckets
-- ============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
    ('posts', 'posts', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav']),
    ('events', 'events', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp']);

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Avatars bucket policies
CREATE POLICY "Avatar images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'avatars' 
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own avatar"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own avatar"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'avatars'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Posts bucket policies
CREATE POLICY "Post media is publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'posts');

CREATE POLICY "Authenticated users can upload post media"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'posts'
        AND auth.uid() IS NOT NULL
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own post media"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'posts'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own post media"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'posts'
        AND auth.uid()::text = (storage.foldername(name))[1]
    );

-- Events bucket policies
CREATE POLICY "Event images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can upload event images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'events'
        AND auth.uid() IS NOT NULL
    );

CREATE POLICY "Event hosts can update event images"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'events'
        AND auth.uid() IS NOT NULL
    );

CREATE POLICY "Event hosts can delete event images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'events'
        AND auth.uid() IS NOT NULL
    );

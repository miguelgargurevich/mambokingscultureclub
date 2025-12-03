export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'member' | 'moderator' | 'admin'
export type PostType = 'text' | 'image' | 'audio' | 'video'
export type PostVisibility = 'public' | 'club-only'
export type RSVPStatus = 'attending' | 'maybe' | 'cancel'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string | null
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          role: UserRole
          created_at: string
          updated_at: string
          is_invited: boolean
          social_links: Json | null
          stats: Json | null
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
          is_invited?: boolean
          social_links?: Json | null
          stats?: Json | null
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          role?: UserRole
          created_at?: string
          updated_at?: string
          is_invited?: boolean
          social_links?: Json | null
          stats?: Json | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          author_id: string
          content: string
          media_urls: string[] | null
          type: PostType
          visibility: PostVisibility
          created_at: string
          updated_at: string
          likes_count: number
          replies_count: number
          tags: string[] | null
        }
        Insert: {
          id?: string
          author_id: string
          content: string
          media_urls?: string[] | null
          type?: PostType
          visibility?: PostVisibility
          created_at?: string
          updated_at?: string
          likes_count?: number
          replies_count?: number
          tags?: string[] | null
        }
        Update: {
          id?: string
          author_id?: string
          content?: string
          media_urls?: string[] | null
          type?: PostType
          visibility?: PostVisibility
          created_at?: string
          updated_at?: string
          likes_count?: number
          replies_count?: number
          tags?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: 'posts_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      comments: {
        Row: {
          id: string
          post_id: string
          author_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          author_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          author_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'comments_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'comments_author_id_fkey'
            columns: ['author_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'likes_post_id_fkey'
            columns: ['post_id']
            isOneToOne: false
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'likes_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          start_at: string
          end_at: string | null
          location: string | null
          location_url: string | null
          host_id: string
          capacity: number | null
          rsvps_count: number
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_at: string
          end_at?: string | null
          location?: string | null
          location_url?: string | null
          host_id: string
          capacity?: number | null
          rsvps_count?: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_at?: string
          end_at?: string | null
          location?: string | null
          location_url?: string | null
          host_id?: string
          capacity?: number | null
          rsvps_count?: number
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'events_host_id_fkey'
            columns: ['host_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      rsvps: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: RSVPStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          status?: RSVPStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          status?: RSVPStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'rsvps_event_id_fkey'
            columns: ['event_id']
            isOneToOne: false
            referencedRelation: 'events'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'rsvps_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
      invites: {
        Row: {
          id: string
          code: string
          created_by: string
          used_by: string | null
          expires_at: string
          created_at: string
          used_at: string | null
          max_uses: number
          use_count: number
        }
        Insert: {
          id?: string
          code: string
          created_by: string
          used_by?: string | null
          expires_at: string
          created_at?: string
          used_at?: string | null
          max_uses?: number
          use_count?: number
        }
        Update: {
          id?: string
          code?: string
          created_by?: string
          used_by?: string | null
          expires_at?: string
          created_at?: string
          used_at?: string | null
          max_uses?: number
          use_count?: number
        }
        Relationships: [
          {
            foreignKeyName: 'invites_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {}
    Functions: {
      increment_likes: {
        Args: { post_id: string }
        Returns: void
      }
      decrement_likes: {
        Args: { post_id: string }
        Returns: void
      }
      increment_rsvps: {
        Args: { event_id: string }
        Returns: void
      }
      decrement_rsvps: {
        Args: { event_id: string }
        Returns: void
      }
    }
    Enums: {
      user_role: UserRole
      post_type: PostType
      post_visibility: PostVisibility
      rsvp_status: RSVPStatus
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Convenience types
export type User = Tables<'users'>
export type Post = Tables<'posts'>
export type Comment = Tables<'comments'>
export type Event = Tables<'events'>
export type RSVP = Tables<'rsvps'>
export type Like = Tables<'likes'>
export type Invite = Tables<'invites'>

// Extended types with relations
export interface PostWithAuthor extends Post {
  author: User
}

export interface CommentWithAuthor extends Comment {
  author: User
}

export interface EventWithHost extends Event {
  host: User
}

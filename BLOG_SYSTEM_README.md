# Blog System Documentation

This document describes the blog system implementation for the Check4Me application.

## Overview

The blog system consists of 4 main views as requested:

1. **Public Blog List** (`/blog`) - Shows all published blog posts to the public
2. **Individual Blog Post** (`/blog/[slug]`) - Shows a single blog post
3. **Admin Blog Management** (`/admin/blog`) - Admin-only page to manage all blog posts
4. **Admin Blog Creation** (`/admin/blog/create`) - Admin-only page to create new blog posts

## Features

### Public Views

- **Blog List**: Displays published blog posts in a card layout with title, excerpt, author, and date
- **Individual Post**: Full blog post view with markdown rendering, author info, and navigation

### Admin Views

- **Management Dashboard**:
  - View all posts (published and drafts)
  - Filter by status (All, Published, Drafts)
  - Edit and delete posts
  - Quick actions and status indicators
- **Create/Edit Form**:
  - Rich text editor with markdown support
  - Live preview functionality
  - Auto-generated URL slugs
  - Draft/publish toggle
  - Form validation

### Technical Features

- **Markdown Support**: Basic markdown parsing for formatting (bold, italic, headers, links)
- **URL Slugs**: SEO-friendly URLs with auto-generation from titles
- **Admin Middleware**: Role-based access control
- **Responsive Design**: Mobile-friendly interface
- **Type Safety**: Full TypeScript implementation

## File Structure

```
types/
  blog.ts                           # Blog-related type definitions

middleware/
  admin.ts                          # Admin role verification middleware

composables/blog/
  useFetchBlogPosts.ts             # Fetch all blog posts
  useFetchBlogPost.ts              # Fetch single blog post by slug
  useCreateBlogPost.ts             # Create new blog post

components/Blog/
  CreatePostForm.vue               # Blog post creation/editing form
  PostsList.vue                    # Reusable blog posts list component

pages/blog/
  index.vue                        # Public blog list page
  [slug].vue                       # Individual blog post page

pages/admin/blog/
  index.vue                        # Admin blog management dashboard
  create.vue                       # Create new blog post page
  preview/[slug].vue               # Admin preview of blog posts
```

## Database Setup

The blog system requires a `blog_posts` table in your Supabase database. Run the SQL script in `database/blog_setup.sql` to create the necessary table and permissions.

### Table Schema

```sql
blog_posts (
  id: SERIAL PRIMARY KEY
  title: VARCHAR(255) NOT NULL
  content: TEXT NOT NULL
  excerpt: TEXT
  slug: VARCHAR(255) NOT NULL UNIQUE
  author_id: UUID NOT NULL (references auth.users)
  created_at: TIMESTAMP WITH TIME ZONE
  updated_at: TIMESTAMP WITH TIME ZONE
  published: BOOLEAN DEFAULT FALSE
)
```

## User Roles

The system requires the user's role to be stored in the `profiles` table with a `role` column that can be 'client', 'checker', or 'admin'. Only users with the 'admin' role can access the admin blog features.

## Navigation

The blog system integrates with the existing navigation:

- **Public Blog Link**: Added to the main header for all users
- **Admin Link**: Only visible to admin users in the header

## Usage

### For Admins

1. **Creating a Blog Post**:

   - Navigate to `/admin/blog`
   - Click "Νέο Blog Post"
   - Fill in the title (slug auto-generates)
   - Write content using markdown
   - Use the preview feature to see how it will look
   - Choose to save as draft or publish immediately

2. **Managing Posts**:
   - View all posts in the admin dashboard
   - Filter by status (All, Published, Drafts)
   - Edit or delete existing posts
   - Preview posts before publishing

### For Public Users

1. **Reading Blog Posts**:
   - Visit `/blog` to see all published posts
   - Click on any post to read the full content
   - Navigate between posts easily

## Markdown Support

The system supports basic markdown formatting:

- **Bold text**: `**text**`
- _Italic text_: `*text*`
- Headers: `# H1`, `## H2`, `### H3`
- Links: `[text](url)`
- Line breaks and paragraphs

## Security

- Row Level Security (RLS) is enabled on the blog_posts table
- Only published posts are visible to the public
- Admin-only routes are protected by middleware
- Proper type checking and validation throughout

## Future Enhancements

Potential improvements for the blog system:

- Rich text editor (WYSIWYG)
- Image upload and management
- Categories and tags
- Search functionality
- Comments system
- SEO meta tags
- Social sharing buttons
- RSS feed
- Post scheduling
- Analytics integration

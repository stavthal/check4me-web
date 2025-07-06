export type BlogPost = {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author_id: string;
  author?: {
    id: string;
    full_name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  published: boolean;
};

export type CreateBlogPost = {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
};

export type UpdateBlogPost = Partial<CreateBlogPost>;

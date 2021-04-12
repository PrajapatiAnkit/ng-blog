export interface Post {
  title: string;
  content: string;
  featured_image: string;
  tags: string;
  author: string;
  user_id: number;
  created_at: string;
}

export interface GetPostResponseModal {
  title: string;
  content: string;
  featured_image: string;
  tags: string;
  user_id: number;
  created_at: string;
}

export interface Comment {
  id: number;
  comment: string;
  commented_by: string;
  created_at: string;
}

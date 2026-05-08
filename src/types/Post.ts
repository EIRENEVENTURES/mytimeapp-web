export interface PostAuthor {
  id: string;
  name: string;
  profilePicture: string;
  initials: string;
}

export interface Post {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  mediaFile?: File;
  isPublic: boolean;
  timestamp: Date;
  likes: number;
  comments: number;
  reshares: number;
  views: number;
  hasLiked: boolean;
  author: PostAuthor;
  // Custom pricing
  likePrice?: number;
  commentPrice?: number;
  // Reshare specific fields
  isReshare?: boolean;
  originalPost?: {
    id: string;
    author: PostAuthor;
    timestamp: Date;
  };
  resharedBy?: PostAuthor;
  // Quote post specific fields
  isQuote?: boolean;
  quotedPost?: {
    id: string;
    author: PostAuthor;
    content: string;
    type: 'text' | 'image' | 'video';
    timestamp: Date;
    isPublic: boolean;
  };
}

export interface PostEngagement {
  postId: string;
  type: 'like' | 'comment';
  cost: number;
  creditSplit?: {
    originalCreator: number;
    resharer: number;
  };
}
export interface Comment {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  userRole: string; 
  content: string;
  date: string;
  likes: number;
  context: string;
  tag?: string; 
  adminReply?: string;
}
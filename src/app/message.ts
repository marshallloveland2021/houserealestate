export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  postId: number;
  content: string;
  timestamp: string; // ISO string
}

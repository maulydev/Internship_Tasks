export type Payload = { name: string; userId: string };

export type ChatMessage = {
  isSystem?: boolean;
  content: string;
  createdAt: string;
  senderId: string;
  sender: { name: string };
};

export type ChatHeaderInfo = {
  id: string;
  name: string;
  isGroup: boolean;
  owner: { name: string };
  description: string;
} | null;

export type Conversations = {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageAt: string;
};

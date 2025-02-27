export type ChatType = 'nl2sql' | 'ga4' | 'summary';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type: ChatType;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
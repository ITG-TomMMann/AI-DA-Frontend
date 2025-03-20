import { Message, ChatType } from './types';

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  type: ChatType;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
  sessionId?: string | null; // For nl2sql sessions
}

export interface ConversationStore {
  conversations: Record<string, Conversation>;
  activeConversationId: string | null;
}

export function createNewConversation(type: ChatType = 'assistant'): Conversation {
  return {
    id: Date.now().toString(),
    title: getDefaultTitle(type),
    messages: [],
    type,
    lastUpdated: new Date(),
    isLoading: false,
    error: null,
    sessionId: null
  };
}

export function getDefaultTitle(type: ChatType): string {
  switch (type) {
    case 'assistant':
      return 'New conversation with Enzo';
    case 'nl2sql':
      return 'New SQL query';
    case 'ga4':
      return 'New GA4 analysis';
    case 'existingAnalysis':
      return 'Existing analysis';
    case 'documentation':
      return 'Documentation';
    default:
      return 'New conversation';
  }
}

export function getConversationTitle(conversation: Conversation): string {
  // If there's a user message, use the first few words as the title
  const firstUserMessage = conversation.messages.find(m => m.role === 'user');
  if (firstUserMessage) {
    const words = firstUserMessage.content.split(' ');
    const titleWords = words.slice(0, 4);
    return titleWords.join(' ') + (words.length > 4 ? '...' : '');
  }
  
  // Otherwise use the default title
  return conversation.title;
}

export function getLastMessagePreview(conversation: Conversation): string {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (!lastMessage) return 'No messages yet';
  
  const preview = lastMessage.content.substring(0, 60);
  return preview + (lastMessage.content.length > 60 ? '...' : '');
}
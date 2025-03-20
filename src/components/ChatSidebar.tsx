import React from 'react';
import { PlusCircle, MessageSquare, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../ThemeContext';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  type: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onConversationSelect: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewConversation,
  onDeleteConversation
}: ChatSidebarProps) {
  const { theme } = useTheme();
  
  return (
    <div className={clsx(
      "w-72 flex flex-col h-full overflow-hidden",
      theme === 'dark' 
        ? "bg-gray-900 text-white" 
        : "bg-white text-gray-900 border-r border-gray-200"
    )}>
      {/* New Chat Button */}
      <button
        onClick={onNewConversation}
        className={clsx(
          "flex items-center gap-3 mx-3 my-4 px-3 py-2 rounded-md transition-colors",
          theme === 'dark'
            ? "border border-gray-600 hover:bg-gray-800"
            : "border border-gray-300 hover:bg-gray-100"
        )}
      >
        <PlusCircle className="w-4 h-4" />
        <span className="text-sm">New chat</span>
      </button>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <h2 className={clsx(
            "text-xs font-medium uppercase px-3 mb-2",
            theme === 'dark' ? "text-gray-400" : "text-gray-500"
          )}>
            Recent conversations
          </h2>
          <ul className="space-y-1">
            {conversations.map((conversation) => (
              <li key={conversation.id}>
                <button
                  onClick={() => onConversationSelect(conversation.id)}
                  className={clsx(
                    "flex items-start gap-3 w-full rounded-md px-3 py-2 text-left transition-colors",
                    activeConversationId === conversation.id
                      ? theme === 'dark' ? "bg-gray-800" : "bg-gray-100"
                      : theme === 'dark' ? "hover:bg-gray-800" : "hover:bg-gray-100"
                  )}
                >
                  <MessageSquare className="w-4 h-4 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{conversation.title}</p>
                    <p className={clsx(
                      "text-xs truncate",
                      theme === 'dark' ? "text-gray-400" : "text-gray-500"
                    )}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {activeConversationId === conversation.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                      className={clsx(
                        "opacity-0 group-hover:opacity-100 p-1",
                        theme === 'dark' ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User Profile */}
      <div className={clsx(
        "p-3",
        theme === 'dark' ? "border-t border-gray-700" : "border-t border-gray-200"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white">
            <span className="text-sm font-medium">AI</span>
          </div>
          <span className="text-sm font-medium">AI Data Analyst</span>
        </div>
      </div>
    </div>
  );
}
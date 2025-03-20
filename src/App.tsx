import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator';
import { TabSelector } from './components/TabSelector';
import { Summary } from './components/Summary';
import { AssistantInfo } from './components/AssistantInfo';
import { ChatSidebar } from './components/ChatSidebar';
import { ThemeProvider, useTheme } from './ThemeContext';
import clsx from 'clsx';
import type { Message, ChatType } from './types';
import { 
  Conversation, 
  ConversationStore, 
  createNewConversation, 
  getConversationTitle, 
  getLastMessagePreview 
} from './ConversationStore';

function AppContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // State for the sidebar visibility on mobile
  const [sidebarVisible, setSidebarVisible] = useState(true);
  
  // Conversations state
  const [conversationStore, setConversationStore] = useState<ConversationStore>({
    conversations: {},
    activeConversationId: null
  });
  
  // Create a new conversation if none exists
  useEffect(() => {
    if (Object.keys(conversationStore.conversations).length === 0) {
      const newConversation = createNewConversation('assistant');
      setConversationStore({
        conversations: {
          [newConversation.id]: newConversation
        },
        activeConversationId: newConversation.id
      });
    }
  }, []);
  
  // Active conversation
  const activeConversation = conversationStore.activeConversationId ? 
    conversationStore.conversations[conversationStore.activeConversationId] : null;
  
  // Active tab is based on the active conversation
  const activeTab = activeConversation?.type || 'assistant';
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleTabChange = (tab: ChatType) => {
    if (!activeConversation || activeConversation.type !== tab) {
      // Create a new conversation of the selected type
      const newConversation = createNewConversation(tab);
      
      setConversationStore(prev => ({
        ...prev,
        conversations: {
          ...prev.conversations,
          [newConversation.id]: newConversation
        },
        activeConversationId: newConversation.id
      }));
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!activeConversation) return;
    
    const conversationId = activeConversation.id;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      type: activeConversation.type,
    };

    // Update the conversation with the new message and set loading state
    setConversationStore(prev => {
      const updatedConversation = {
        ...prev.conversations[conversationId],
        messages: [...prev.conversations[conversationId].messages, newMessage],
        isLoading: true,
        error: null,
        lastUpdated: new Date(),
      };
      
      // Update the title based on first user message if needed
      if (updatedConversation.messages.filter(m => m.role === 'user').length === 1) {
        updatedConversation.title = getConversationTitle(updatedConversation);
      }
      
      return {
        ...prev,
        conversations: {
          ...prev.conversations,
          [conversationId]: updatedConversation
        }
      };
    });

    try {
      let endpoint = '';
      let payload: any = {};

      // Endpoint logic for different tabs
      switch (activeConversation.type) {
        case 'nl2sql':
          if (!activeConversation.sessionId) {
            // First message: use /query endpoint
            endpoint = 'https://5c66-35-210-217-224.ngrok-free.app/api/nl2sq/query';
            payload = { query: content };
          } else {
            // Follow-up message: use /followup endpoint
            endpoint = 'https://5c66-35-210-217-224.ngrok-free.app/api/nl2sq/followup';
            payload = { follow_up_query: content, session_id: activeConversation.sessionId };
          }
          break;
        case 'ga4':
          endpoint = 'https://5c66-35-210-217-224.ngrok-free.app/api/api/ga4';
          payload = { url: content };
          break;
        case 'assistant':
          endpoint = 'https://5c66-35-210-217-224.ngrok-free.app/api/route';
          payload = { message: content };
          break;
        case 'existingAnalysis':
          endpoint = 'https://5c66-35-210-217-224.ngrok-free.app/api/query';
          payload = { query: content };
          break;
        default:
          endpoint = 'https://5c66-35-210-217-224.ngrok-free.app/api/route';
          payload = { message: content };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to get response from ${activeConversation.type.toUpperCase()} assistant`);
      }

      const data = await response.json();

      // Store the session ID if provided (nl2sql)
      let sessionId = activeConversation.sessionId;
      if (activeConversation.type === 'nl2sql' && data.session_id) {
        sessionId = data.session_id;
      }

      // Use either data.response or data.sql as the answer
      const assistantAnswer = data.response || data.sql || 'No response found.';
      const newAssistantMessage: Message = {
        id: Date.now().toString(),
        content: assistantAnswer,
        role: 'assistant',
        timestamp: new Date(),
        type: activeConversation.type,
      };

      setConversationStore(prev => ({
        ...prev,
        conversations: {
          ...prev.conversations,
          [conversationId]: {
            ...prev.conversations[conversationId],
            messages: [...prev.conversations[conversationId].messages, newAssistantMessage],
            isLoading: false,
            sessionId,
            lastUpdated: new Date(),
          }
        }
      }));
    } catch (error) {
      console.error(error);
      setConversationStore(prev => ({
        ...prev,
        conversations: {
          ...prev.conversations,
          [conversationId]: {
            ...prev.conversations[conversationId],
            isLoading: false,
            error: 'Failed to get response. Please try again.',
            lastUpdated: new Date(),
          }
        }
      }));
    }
  };

  // Create a new conversation
  const handleNewConversation = () => {
    const newConversation = createNewConversation('assistant');
    setConversationStore(prev => ({
      ...prev,
      conversations: {
        ...prev.conversations,
        [newConversation.id]: newConversation
      },
      activeConversationId: newConversation.id
    }));
  };

  // Select an existing conversation
  const handleConversationSelect = (id: string) => {
    setConversationStore(prev => ({
      ...prev,
      activeConversationId: id
    }));
  };

  // Delete a conversation
  const handleDeleteConversation = (id: string) => {
    setConversationStore(prev => {
      const updatedConversations = { ...prev.conversations };
      delete updatedConversations[id];
      
      // If we deleted the active conversation, select another one or create a new one
      let activeId = prev.activeConversationId;
      if (id === prev.activeConversationId) {
        const conversationIds = Object.keys(updatedConversations);
        activeId = conversationIds.length > 0 ? conversationIds[0] : null;
        
        // If no conversations left, create a new one
        if (!activeId) {
          const newConversation = createNewConversation('assistant');
          updatedConversations[newConversation.id] = newConversation;
          activeId = newConversation.id;
        }
      }
      
      return {
        conversations: updatedConversations,
        activeConversationId: activeId
      };
    });
  };

  // Clear messages in the current conversation
  const handleClearChat = () => {
    if (!activeConversation) return;
    
    setConversationStore(prev => ({
      ...prev,
      conversations: {
        ...prev.conversations,
        [activeConversation.id]: {
          ...prev.conversations[activeConversation.id],
          messages: [],
          isLoading: false,
          error: null,
          sessionId: null,
        }
      }
    }));
  };

  // Format conversations for the sidebar
  const sidebarConversations = Object.values(conversationStore.conversations)
    .filter(conv => conv.type !== 'documentation')
    .map(conv => ({
      id: conv.id,
      title: conv.title,
      lastMessage: getLastMessagePreview(conv),
      timestamp: conv.lastUpdated,
      type: conv.type
    }))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className={clsx(
      "flex flex-col h-screen",
      isDark ? "bg-gray-900" : "bg-gray-50"
    )}>
      <Header 
        onMenuToggle={() => setSidebarVisible(prev => !prev)}
        showMenuButton={true}
      />
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Sidebar - hidden on mobile by default */}
        <div className={`${sidebarVisible ? 'block' : 'hidden'} md:block`}>
          <ChatSidebar
            conversations={sidebarConversations}
            activeConversationId={conversationStore.activeConversationId}
            onConversationSelect={handleConversationSelect}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
          />
        </div>

        {/* Main Content */}
        <main className={clsx(
          "flex-1 flex flex-col",
          isDark ? "bg-gray-900" : "bg-white"
        )}>
          <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'documentation' ? (
              <Summary />
            ) : activeTab === 'assistant' && (!activeConversation || activeConversation.messages.length === 0) ? (
              <AssistantInfo />
            ) : (
              <>
                {!activeConversation || activeConversation.messages.length === 0 ? (
                  <div className={clsx(
                    "h-full flex items-center justify-center",
                    isDark ? "text-gray-400" : "text-gray-500"
                  )}>
                    <p>
                      Start a conversation with your {
                        activeTab === 'nl2sql' ? 'SQL Query' : 
                        activeTab === 'ga4' ? 'GA4 Event' :
                        activeTab === 'existingAnalysis' ? 'Existing Analysis' :
                        'AI'
                      } Assistant
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="max-w-5xl mx-auto w-full">
                      {activeConversation.messages.map(message => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                      {activeConversation.isLoading && <LoadingIndicator />}
                      {activeConversation.error && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm">
                          {activeConversation.error}
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </>
                )}
              </>
            )}
          </div>

          {activeTab !== 'documentation' && (
            <div className={clsx(
              "border-t",
              isDark ? "border-gray-700" : "border-gray-200"
            )}>
              <div className="max-w-5xl mx-auto w-full">
                <div className="flex justify-end px-4 py-2">
                  <button
                    onClick={handleClearChat}
                    className={clsx(
                      "flex items-center gap-2 text-sm",
                      isDark 
                        ? "text-gray-400 hover:text-gray-300" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear conversation
                  </button>
                </div>
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={!activeConversation || activeConversation.isLoading}
                  placeholder={
                    activeTab === 'nl2sql'
                      ? 'Ask a question about your data...'
                      : activeTab === 'ga4'
                      ? 'Ask about GA4 events and tracking...'
                      : activeTab === 'existingAnalysis'
                      ? 'Query your existing analysis...'
                      : 'Ask Enzo anything about your data...'
                  }
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
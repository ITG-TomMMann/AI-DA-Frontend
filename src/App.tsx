import React, { useState, useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator';
import { ProgressRoadmap } from './components/ProgressRoadmap';
import { TabSelector } from './components/TabSelector';
import { Summary } from './components/Summary';
import type { Message, ChatState, ChatType } from './types';

function App() {
  // Start with the 'summary' tab by default
  const [activeTab, setActiveTab] = useState<ChatType>('summary');
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  
  // State for tracking the nl2sql session
  const [nl2sqlSessionId, setNl2sqlSessionId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSendMessage = async (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      type: activeTab,
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isLoading: true,
      error: null,
    }));

    try {
      let endpoint = '';
      let payload: any = {};

      // Endpoint logic for nl2sql and ga4
      if (activeTab === 'nl2sql') {
        if (!nl2sqlSessionId) {
          // First message: use /query endpoint
          endpoint = 'http://127.0.0.1:8000/query';
          payload = { query: content };
        } else {
          // Follow-up message: use /followup endpoint
          endpoint = 'http://127.0.0.1:8000/followup';
          payload = { follow_up_query: content, session_id: nl2sqlSessionId };
        }
      } else if (activeTab === 'ga4') {
        endpoint = 'http://127.0.0.1:8000/ga4';
        payload = { message: content };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to get response from ${activeTab.toUpperCase()} assistant`);
      }

      const data = await response.json();

      // Store the session ID if provided (nl2sql)
      if (activeTab === 'nl2sql' && data.session_id) {
        setNl2sqlSessionId(data.session_id);
      }

      // Use either data.response or data.sql as the answer
      const assistantAnswer = data.response || data.sql || 'No response found.';
      const newAssistantMessage: Message = {
        id: Date.now().toString(),
        content: assistantAnswer,
        role: 'assistant',
        timestamp: new Date(),
        type: activeTab,
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newAssistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      console.error(error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to get response. Please try again.',
      }));
    }
  };

  // Clear both the chat messages and the nl2sql session
  const handleClearChat = () => {
    setState({
      messages: [],
      isLoading: false,
      error: null,
    });
    setNl2sqlSessionId(null);
  };

  // Filter messages based on the active tab
  const filteredMessages = state.messages.filter(
    message => message.type === activeTab
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ProgressRoadmap />
        <main className="flex-1 flex flex-col">
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'summary' ? (
              <Summary />
            ) : (
              <>
                {filteredMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    <p>
                      Start a conversation with your {activeTab === 'nl2sql' ? 'SQL Query' : 'GA4 Event'} Assistant
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="max-w-4xl mx-auto w-full">
                      {filteredMessages.map(message => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                      {state.isLoading && <LoadingIndicator />}
                      {state.error && (
                        <div className="p-4 bg-red-50 text-red-700 text-sm">
                          {state.error}
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </>
                )}
              </>
            )}
          </div>

          {activeTab !== 'summary' && (
            <div className="border-t border-gray-200">
              <div className="max-w-4xl mx-auto w-full">
                <div className="flex justify-end px-4 py-2">
                  <button
                    onClick={handleClearChat}
                    className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear conversation
                  </button>
                </div>
                <ChatInput
                  onSendMessage={handleSendMessage}
                  disabled={state.isLoading}
                  placeholder={
                    activeTab === 'nl2sql'
                      ? 'Ask a question about your data...'
                      : 'Ask about GA4 events and tracking...'
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

export default App;

import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '../ThemeContext';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to format GA4 responses for better display
  function formatGA4Response(content: string) {
    try {
      // Try to parse the content as JSON if it's a string
      const data = typeof content === 'string' ? JSON.parse(content) : content;
      
      // Check if this is a GA4 response with events
      if (data && data.events && Array.isArray(data.events)) {
        return (
          <div className="ga4-events">
            <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              GA4 Events Captured
            </h3>
            
            {data.events.length === 0 ? (
              <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                No GA4 events found on this page.
              </p>
            ) : (
              <div className="space-y-4">
                {data.events.map((event, index) => (
                  <div 
                    key={index} 
                    className={
                      isDark
                        ? 'bg-gray-800 p-3 rounded-md border border-gray-700'
                        : 'bg-gray-100 p-3 rounded-md border border-gray-200'
                    }
                  >
                    {event.event_label && (
                      <div className="mb-1">
                        <span className="font-medium">Event Label:</span> {event.event_label}
                      </div>
                    )}
                    {event.event_action && (
                      <div className="mb-1">
                        <span className="font-medium">Event Action:</span> {event.event_action}
                      </div>
                    )}
                    {event.event_category && (
                      <div className="mb-1">
                        <span className="font-medium">Event Category:</span> {event.event_category}
                      </div>
                    )}
                    {event.button_text && (
                      <div className="mb-1">
                        <span className="font-medium">Button Text:</span> {event.button_text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
      
      // Check for error messages
      if (data && data.error) {
        return (
          <div className={
            isDark
              ? 'bg-red-900/30 text-red-300 p-4 rounded-md border border-red-800'
              : 'bg-red-50 text-red-700 p-4 rounded-md border border-red-200'
          }>
            <p className="font-medium">Error:</p>
            <p>{data.error}</p>
          </div>
        );
      }
      
      // Check for message (no events found)
      if (data && data.message) {
        return (
          <div className={
            isDark
              ? 'bg-blue-900/30 text-blue-300 p-4 rounded-md border border-blue-800'
              : 'bg-blue-50 text-blue-700 p-4 rounded-md border border-blue-200'
          }>
            <p>{data.message}</p>
          </div>
        );
      }
      
    } catch (e) {
      // Not a valid JSON or not a GA4 response
      console.log("Not a GA4 response:", e);
    }
    
    // If not a GA4 response or couldn't parse, return null to use default rendering
    return null;
  }

  return (
    <div
      className={clsx(
        'py-6 px-4 flex flex-col gap-2',
        message.role === 'assistant' 
          ? isDark ? 'bg-gray-800' : 'bg-white'
          : isDark ? 'bg-gray-900' : 'bg-gray-50'
      )}
    >
      {/* Sender + Timestamp */}
      <div className="flex items-center gap-2">
        <span className={clsx(
          "font-medium",
          isDark ? "text-white" : "text-gray-900"
        )}>
          {message.role === 'assistant' ? 'AI Data Analyst' : 'You'}
        </span>
        <span className={clsx(
          "text-sm",
          isDark ? "text-gray-400" : "text-gray-500"
        )}>
          {format(message.timestamp, 'h:mm a')}
        </span>
      </div>

      {/* Message Content */}
      <div className={clsx(
        "prose prose-sm max-w-none whitespace-pre-wrap",
        isDark ? "prose-invert" : ""
      )}>
        {/* Special handling for GA4 responses */}
        {message.type === 'ga4' && message.role === 'assistant' ? (
          formatGA4Response(message.content) || (
            <ReactMarkdown
              breaks={true}
              components={{
                code({ node, inline, className, children, ...props }) {
                  // Attempt to detect language class for syntax highlighting
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="relative">
                      <button
                        onClick={() => copyCode(String(children))}
                        className={clsx(
                          "absolute right-2 top-2 p-1 rounded transition-colors",
                          isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                        )}
                        title={copied ? "Copied!" : "Copy code"}
                      >
                        <Copy className={clsx(
                          "w-4 h-4",
                          isDark ? "text-gray-400" : "text-gray-600"
                        )} />
                      </button>
                      <SyntaxHighlighter
                        language={match[1]}
                        style={isDark ? vscDarkPlus : prism}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className={clsx(
                      className,
                      isDark ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"
                    )} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )
        ) : (
          <ReactMarkdown
            breaks={true}
            components={{
              code({ node, inline, className, children, ...props }) {
                // Attempt to detect language class for syntax highlighting
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative">
                    <button
                      onClick={() => copyCode(String(children))}
                      className={clsx(
                        "absolute right-2 top-2 p-1 rounded transition-colors",
                        isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                      )}
                      title={copied ? "Copied!" : "Copy code"}
                    >
                      <Copy className={clsx(
                        "w-4 h-4",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )} />
                    </button>
                    <SyntaxHighlighter
                      language={match[1]}
                      style={isDark ? vscDarkPlus : prism}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={clsx(
                    className,
                    isDark ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800"
                  )} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
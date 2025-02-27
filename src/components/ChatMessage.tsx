import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import type { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={clsx(
        'py-6 px-4 flex flex-col gap-2',
        message.role === 'assistant' ? 'bg-white' : 'bg-gray-50'
      )}
    >
      {/* Sender + Timestamp */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-gray-900">
          {message.role === 'assistant' ? 'AI Data Analyst' : 'You'}
        </span>
        <span className="text-sm text-gray-500">
          {format(message.timestamp, 'h:mm a')}
        </span>
      </div>

      {/* Message Content */}
      <div className="prose prose-sm max-w-none whitespace-pre-wrap">
        <ReactMarkdown
          breaks={true} // Tells ReactMarkdown to treat line breaks as actual <br> elements
          components={{
            code({ node, inline, className, children, ...props }) {
              // Attempt to detect language class for syntax highlighting
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <div className="relative">
                  <button
                    onClick={() => copyCode(String(children))}
                    className="absolute right-2 top-2 p-1 rounded hover:bg-gray-700 transition-colors"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                  <SyntaxHighlighter
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import clsx from 'clsx';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ onSendMessage, disabled, placeholder }: ChatInputProps) {
  const [input, setInput] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "p-4",
        isDark ? "bg-gray-800" : "bg-white"
      )}
    >
      <div className="flex gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder || "Type your message..."}
          className={clsx(
            "flex-1 min-w-0 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent",
            isDark 
              ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400" 
              : "bg-white text-gray-900 border border-gray-300 placeholder-gray-500"
          )}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
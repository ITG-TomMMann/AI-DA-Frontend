import { Database, Activity, FileText, HelpCircle, BarChart2 } from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../ThemeContext';
import type { ChatType } from '../types';

interface TabSelectorProps {
  activeTab: ChatType;
  onTabChange: (tab: ChatType) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <div className={clsx(
      "flex border-b",
      isDark ? "border-gray-700" : "border-gray-200"
    )}>
      <button
        onClick={() => onTabChange('assistant')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
          activeTab === 'assistant'
            ? 'border-pink-600 text-pink-600'
            : isDark 
              ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
      >
        <HelpCircle className="w-4 h-4" />
        Enzo the Assistant
      </button>
      <button
        onClick={() => onTabChange('nl2sql')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
          activeTab === 'nl2sql'
            ? 'border-pink-600 text-pink-600'
            : isDark 
              ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
      >
        <Database className="w-4 h-4" />
        SQL Query Assistant
      </button>
      <button
        onClick={() => onTabChange('ga4')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
          activeTab === 'ga4'
            ? 'border-pink-600 text-pink-600'
            : isDark 
              ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
      >
        <Activity className="w-4 h-4" />
        GA4 Event Assistant
      </button>
      <button
        onClick={() => onTabChange('existingAnalysis')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
          activeTab === 'existingAnalysis'
            ? 'border-pink-600 text-pink-600'
            : isDark 
              ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
      >
        <BarChart2 className="w-4 h-4" />
        Existing Analysis
      </button>
      <button
        onClick={() => onTabChange('documentation')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
          activeTab === 'documentation'
            ? 'border-pink-600 text-pink-600'
            : isDark 
              ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
      >
        <FileText className="w-4 h-4" />
        Documentation
      </button>
    </div>
  );
}
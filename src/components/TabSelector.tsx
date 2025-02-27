import { Database, Activity, FileText } from 'lucide-react';
import clsx from 'clsx';
import type { ChatType } from '../types';

interface TabSelectorProps {
  activeTab: ChatType;
  onTabChange: (tab: ChatType) => void;
}

export function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => onTabChange('summary')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
          activeTab === 'summary'
            ? 'border-pink-600 text-pink-600'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
      >
        <FileText className="w-4 h-4" />
        Summary
      </button>
      <button
        onClick={() => onTabChange('nl2sql')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
          activeTab === 'nl2sql'
            ? 'border-pink-600 text-pink-600'
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
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        )}
      >
        <Activity className="w-4 h-4" />
        GA4 Event Assistant
      </button>
    </div>
  );
}
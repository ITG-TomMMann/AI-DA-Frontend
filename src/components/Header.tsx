import { Brain, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Brain className="w-8 h-8 text-pink-600" />
        <h1 className="text-xl font-semibold text-gray-900">AI Data Analyst</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <img 
          src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/itg-logo.png" 
          alt="ITG Logo" 
          className="h-8 w-auto"
        />
        <button
          onClick={onLogout}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-1 text-sm"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
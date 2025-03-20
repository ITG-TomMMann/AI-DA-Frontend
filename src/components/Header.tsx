import { Brain, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import clsx from 'clsx';

interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  return (
    <header className={clsx(
      "border-b px-4 py-3 flex items-center gap-4",
      isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"
    )}>
      {showMenuButton && (
        <button 
          onClick={onMenuToggle}
          className={clsx(
            "md:hidden p-1 rounded-md",
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          )}
          aria-label="Toggle menu"
        >
          <Menu className={clsx("w-6 h-6", isDark ? "text-gray-300" : "text-gray-600")} />
        </button>
      )}
      <div className="flex items-center gap-3">
        <Brain className="w-8 h-8 text-pink-600" />
        <h1 className="text-xl font-semibold">AI Data Analyst</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={clsx(
            "p-2 rounded-md",
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
          )}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </button>
        
        <img 
          src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/itg-logo.png" 
          alt="ITG Logo" 
          className="h-8 w-auto"
        />
      </div>
    </header>
  );
}
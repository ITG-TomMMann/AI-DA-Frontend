import { Brain } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
      <div className="flex items-center gap-3">
        <Brain className="w-8 h-8 text-pink-600" />
        <h1 className="text-xl font-semibold text-gray-900">AI Data Analyst</h1>
      </div>
      <div className="ml-auto">
        <img 
          src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/itg-logo.png" 
          alt="ITG Logo" 
          className="h-8 w-auto"
        />
      </div>
    </header>
  );
}
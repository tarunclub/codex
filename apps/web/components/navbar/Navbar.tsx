import React from 'react';
import Chat from '../chat/Chat';
import { ModeToggle } from './DarkMode';
import { Button } from '../ui/button';
import { Edit, EditIcon, PlayIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between pr-4">
      {/* Left section */}
      <div className="font-mono text-2xl font-semibold">codeX</div>
      {/* middle section */}
      <div>
        <Button variant="outline">
          <PlayIcon className="h-6 w-6" />
          <span className="ml-2">Run</span>
        </Button>
      </div>
      {/* Right section */}
      <div className="flex items-center space-x-4 py-2">
        {/* Allow Collaboration */}
        <Button variant="outline">
          <EditIcon className="h-5 w-5 mr-2" />
          <span>Collaborate</span>
        </Button>
        <Chat />
        <ModeToggle />
      </div>
    </nav>
  );
}

import React from 'react';
import CreatePlayground from '../models/CreatePlayground';

export default function Sidebar() {
  return (
    <div className="h-screen p-4">
      {/* Create Playground */}
      <div>
        <CreatePlayground />
      </div>
    </div>
  );
}

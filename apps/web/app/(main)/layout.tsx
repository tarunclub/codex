import React from 'react';
import { Sidebar } from '../_components/playground/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <div>
        <Sidebar />
      </div>
      <main className="overflow-y-scroll">{children}</main>
    </div>
  );
}

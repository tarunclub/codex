import { useState } from 'react';
import { TFiles } from './data';

type EntryProps = {
  entry: TFiles;
  depth: number;
};

export default function Entry({ entry, depth }: EntryProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        style={{ display: 'flex' }}
      >
        {entry.children && (
          <div
            style={{ paddingLeft: '6px', paddingRight: '6px', width: '20px' }}
          >
            {isExpanded ? '-' : '+'}
          </div>
        )}
        <span
          className="name"
          style={{ paddingLeft: entry.children ? '' : '20px' }}
        >
          {entry.name}
        </span>
      </button>
      <div style={{ borderLeft: '1px solid black', margin: '5px 5px' }}>
        {isExpanded &&
          entry.children &&
          entry.children.map((child) => (
            <Entry key={child.name} entry={child} depth={depth + 1} />
          ))}
      </div>
    </>
  );
}

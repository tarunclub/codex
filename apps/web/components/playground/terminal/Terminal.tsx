import React, { useState } from 'react';

function Terminal() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = () => {};

  return (
    <div className="bg-black text-white font-mono h-screen">
      <div className="p-4 flex items-center">
        <div className="flex items-center">
          <span className="text-green-500">user@hostname:</span>
          <span className="ml-2">currentDirectory</span>
        </div>
        <div className="">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="w-full bg-transparent text-white outline-none ml-2"
          />
        </div>
      </div>
      <div className="overflow-y-auto" style={{ height: '400px' }}>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default Terminal;

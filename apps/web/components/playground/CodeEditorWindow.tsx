import { useState } from 'react';
import { useTheme } from 'next-themes';

import Editor from '@monaco-editor/react';

const CodeEditorWindow = () => {
  const [value, setValue] = useState<string>();
  const { theme } = useTheme();

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={'javascript'}
        value={value}
        theme={`${theme === 'dark' ? 'vs-dark' : 'vs-light'}`}
        options={{
          fontSize: 16,
        }}
        defaultValue="// some comment"
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  );
};
export default CodeEditorWindow;

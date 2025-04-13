import React, { useRef, useEffect } from 'react';
import { useDoc } from '../../context/DocContext';

export default function Editor({ height = '100%' }) {
  const { markdown, updateMarkdown } = useDoc();
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleTabKey = (e) => {
      if (e.key === 'Tab' && document.activeElement === textareaRef.current) {
        e.preventDefault();

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;

        // Insert tab at current position
        const newText = markdown.substring(0, start) + '  ' + markdown.substring(end);
        updateMarkdown(newText);

        // Move cursor position after the inserted tab
        setTimeout(() => {
          textareaRef.current.selectionStart = start + 2;
          textareaRef.current.selectionEnd = start + 2;
        }, 0);
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [markdown, updateMarkdown]);

  return (
    <div className="h-full w-full flex flex-col overflow-hidden" data-testid="editor-container">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex-shrink-0">
        <h2 className="text-sm font-medium text-gray-700">Editor</h2>
      </div>
      <textarea
        ref={textareaRef}
        className="flex-1 w-full h-full p-4 font-mono text-sm resize-none focus:outline-none overflow-auto"
        value={markdown}
        onChange={(e) => updateMarkdown(e.target.value)}
        placeholder="Write your documentation in Markdown..."
        data-testid="editor-textarea"
      />
    </div>
  );
}

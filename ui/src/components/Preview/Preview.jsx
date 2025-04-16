import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDoc } from '../../context/DocContext';

export default function Preview() {
  const { markdown } = useDoc();
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden" data-testid="preview-container">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-700">Preview</h2>
      </div>
      <div className="flex-1 overflow-auto p-6 bg-white">
        <div className="prose max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]} data-testid="markdown-preview">
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
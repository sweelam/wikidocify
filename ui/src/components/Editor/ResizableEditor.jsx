import React from 'react';
import { Resizable } from 're-resizable';
import { useDoc } from '../../context/DocContext';
import Editor from './Editor';

export default function ResizableEditor() {
  const { showPreview } = useDoc();

  return (
    <Resizable
      defaultSize={{ width: showPreview ? '60%' : '100%', height: '100%' }}
      minWidth="60%"
      maxWidth={showPreview ? '80%' : '100%'}
      enable={{
        top: false,
        right: showPreview,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false
      }}
      className="bg-white rounded-xl shadow-md p-4 overflow-auto border-r border-gray-200"
      data-testid="resizable-editor"
    >
      <Editor />
    </Resizable>
  );
}

import React, { useState } from 'react';
import { Eye, EyeOff, Share, Upload } from 'lucide-react';
import { useDoc } from '../../context/DocContext';
import Button from '../common/Button';
import SaveStatus from './SaveStatus';

export default function Header() {
  const { showPreview, togglePreview, publishDoc, shareDoc, savedStatus } = useDoc();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishDoc();
    } finally {
      setIsPublishing(false);
    }
  };
  
  const handleShare = async () => {
    setIsSharing(true);
    try {
      await shareDoc();
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800">Documentation Editor</h1>
        <SaveStatus status={savedStatus} />
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="secondary"
          onClick={togglePreview}
          data-testid="preview-toggle"
        >
          {showPreview ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show Preview
            </>
          )}
        </Button>
        <Button 
          variant="secondary"
          onClick={handleShare}
          disabled={isSharing}
          data-testid="share-button"
        >
          <Share className="h-4 w-4 mr-2" />
          {isSharing ? 'Sharing...' : 'Share'}
        </Button>
        <Button 
          variant="primary"
          onClick={handlePublish}
          disabled={isPublishing}
          data-testid="publish-button"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isPublishing ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
    </header>
  );
}
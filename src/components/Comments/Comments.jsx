import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { useDoc } from '../../context/DocContext';

export default function Comments() {
  const [isExpanded, setIsExpanded] = useState(true);
  const { comments } = useDoc();
  
  return (
    <div className="bg-white border-t border-gray-200" data-testid="comments-section">
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-700">
          Comments & Feedback {comments.length > 0 && `(${comments.length})`}
        </h2>
        <button 
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={() => setIsExpanded(!isExpanded)}
          data-testid="toggle-comments"
        >
          {isExpanded ? (
            <div className="flex items-center">
              <ChevronUp className="h-4 w-4 mr-1" />
              Hide
            </div>
          ) : (
            <div className="flex items-center">
              <ChevronDown className="h-4 w-4 mr-1" />
              Show
            </div>
          )}
        </button>
      </div>
      
      {isExpanded && (
        <>
          <CommentList />
          <CommentForm />
        </>
      )}
    </div>
  );
}
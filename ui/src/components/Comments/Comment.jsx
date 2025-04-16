import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export default function Comment({ comment }) {
  const timeAgo = formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true });
  
  return (
    <div className="mb-3 pb-3 border-b border-gray-100 last:border-0" data-testid="comment-item">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span className="font-medium">{comment.author}</span>
        <span title={new Date(comment.timestamp).toLocaleString()}>{timeAgo}</span>
      </div>
      <p className="text-sm text-gray-700">{comment.text}</p>
    </div>
  );
}
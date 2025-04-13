import React from 'react';
import { useDoc } from '../../context/DocContext';
import Comment from './Comment';

export default function CommentList() {
  const { comments } = useDoc();
  
  if (comments.length === 0) {
    return (
      <div className="px-4 py-8 text-center" data-testid="empty-comments">
        <p className="text-sm text-gray-500 italic">No comments yet. Be the first to provide feedback!</p>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-2 max-h-64 overflow-y-auto" data-testid="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useDoc } from '../../context/DocContext';

export default function CommentForm() {
  const [newComment, setNewComment] = useState('');
  const { addComment } = useDoc();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    addComment(newComment.trim());
    setNewComment('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-200 flex" data-testid="comment-form">
      <input
        type="text"
        className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Add a comment or feedback..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        data-testid="comment-input"
      />
      <button
        type="submit"
        disabled={!newComment.trim()}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        data-testid="comment-submit"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}
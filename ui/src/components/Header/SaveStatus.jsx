import React from 'react';
import { Check, Clock } from 'lucide-react';

export default function SaveStatus({ status }) {
  if (status === 'saved') {
    return (
      <div className="flex items-center text-xs text-green-600">
        <Check className="h-3 w-3 mr-1" />
        <span>Saved</span>
      </div>
    );
  }
  
  if (status === 'saving') {
    return (
      <div className="flex items-center text-xs text-amber-600">
        <Clock className="h-3 w-3 mr-1 animate-pulse" />
        <span>Saving...</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center text-xs text-gray-500">
      <span>Unsaved changes</span>
    </div>
  );
}
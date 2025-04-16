import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce';
import { extractTitle } from '../utils/markdown';

const DocContext = createContext();

const DEFAULT_MARKDOWN = `# Your Documentation

Start writing your documentation here...

## Features
- Easy Markdown editing
- Live preview
- Collaboration through comments
- Publishing options

## Getting Started
1. Write your content in the editor
2. Preview your changes in real-time
3. Share with collaborators for feedback
4. Publish when ready

## Examples

### Code Block Example
\`\`\`javascript
function helloWorld() {
  console.log('Hello, Documentation System!');
}
\`\`\`

### Table Example
| Feature | Description |
|---------|-------------|
| Editor | Markdown editor with syntax highlighting |
| Preview | Real-time preview of your content |
| Comments | Collaborative feedback system |
| Publishing | One-click publishing to share your work |
`;

export function DocProvider({ children }) {
  // Main document state
  const [markdown, setMarkdownRaw] = useLocalStorage('doc-content', DEFAULT_MARKDOWN);
  const [title, setTitle] = useState(() => extractTitle(markdown));
  const [showPreview, setShowPreview] = useLocalStorage('doc-show-preview', true);
  const [comments, setComments] = useLocalStorage('doc-comments', []);
  const [savedStatus, setSavedStatus] = useState('saved'); // 'saved', 'saving', 'unsaved'
  const [documentId, setDocumentId] = useLocalStorage('doc-id', `doc-${Date.now()}`);
  const [documentHistory, setDocumentHistory] = useLocalStorage('doc-history', []);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  // Document metadata
  const [lastSaved, setLastSaved] = useState(Date.now());
  
  // Debounce markdown changes to avoid excessive localStorage writes
  const debouncedMarkdown = useDebounce(markdown, 1000);
  
  // Update title whenever markdown changes (debounced)
  useEffect(() => {
    setTitle(extractTitle(debouncedMarkdown));
  }, [debouncedMarkdown]);
  
  // Simulate autosave functionality
  useEffect(() => {
    setSavedStatus('saving');
    const timeout = setTimeout(() => {
      setSavedStatus('saved');
      setLastSaved(Date.now());
      
      // Add to history if content has changed
      if (documentHistory.length === 0 || documentHistory[documentHistory.length - 1].content !== debouncedMarkdown) {
        const newHistory = [...documentHistory];
        if (newHistory.length >= 50) {
          newHistory.shift(); // Remove oldest entry if we have too many
        }
        newHistory.push({
          timestamp: Date.now(),
          content: debouncedMarkdown
        });
        setDocumentHistory(newHistory);
        setCurrentHistoryIndex(newHistory.length - 1);
      }
    }, 1500);
    
    return () => clearTimeout(timeout);
  }, [debouncedMarkdown, documentHistory, setDocumentHistory]);
  
  // Update markdown content
  const updateMarkdown = useCallback((content) => {
    setMarkdownRaw(content);
    setSavedStatus('unsaved');
  }, [setMarkdownRaw]);
  
  // Toggle preview
  const togglePreview = useCallback(() => {
    setShowPreview(prev => !prev);
  }, [setShowPreview]);
  
  // Add a comment
  const addComment = useCallback((text, author = 'User') => {
    const newComment = {
      id: Date.now(),
      text,
      author,
      timestamp: new Date().toISOString(),
    };
    setComments(prev => [...prev, newComment]);
  }, [setComments]);
  
  // Delete a comment
  const deleteComment = useCallback((commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  }, [setComments]);
  
  // Publishing functionality
  const publishDoc = useCallback(async () => {
    setSavedStatus('saving');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSavedStatus('saved');
    return {
      success: true,
      documentId,
      title,
      url: `https://docs.example.com/published/${documentId}`
    };
  }, [documentId, title]);
  
  // Sharing functionality
  const shareDoc = useCallback(async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      documentId,
      title,
      shareLink: `https://docs.example.com/shared/${documentId}`
    };
  }, [documentId, title]);
  
  // Undo/Redo functionality
  const canUndo = currentHistoryIndex > 0;
  const canRedo = currentHistoryIndex < documentHistory.length - 1;
  
  const undo = useCallback(() => {
    if (!canUndo) return;
    
    const newIndex = currentHistoryIndex - 1;
    setCurrentHistoryIndex(newIndex);
    setMarkdownRaw(documentHistory[newIndex].content);
  }, [canUndo, currentHistoryIndex, documentHistory, setMarkdownRaw]);
  
  const redo = useCallback(() => {
    if (!canRedo) return;
    
    const newIndex = currentHistoryIndex + 1;
    setCurrentHistoryIndex(newIndex);
    setMarkdownRaw(documentHistory[newIndex].content);
  }, [canRedo, currentHistoryIndex, documentHistory, setMarkdownRaw]);
  
  // Create a new document
  const createNewDocument = useCallback(() => {
    const newDocId = `doc-${Date.now()}`;
    setDocumentId(newDocId);
    setMarkdownRaw(DEFAULT_MARKDOWN);
    setComments([]);
    setDocumentHistory([]);
    setCurrentHistoryIndex(-1);
  }, [setDocumentId, setMarkdownRaw, setComments, setDocumentHistory]);
  
  return (
    <DocContext.Provider
      value={{
        markdown,
        title,
        showPreview,
        comments,
        savedStatus,
        lastSaved,
        documentId,
        canUndo,
        canRedo,
        updateMarkdown,
        togglePreview,
        addComment,
        deleteComment,
        publishDoc,
        shareDoc,
        undo,
        redo,
        createNewDocument,
      }}
    >
      {children}
    </DocContext.Provider>
  );
}

export const useDoc = () => useContext(DocContext);
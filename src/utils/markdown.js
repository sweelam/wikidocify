/**
 * Utility functions for working with markdown
 */

/**
 * Extract the title from markdown content
 * @param {string} markdown - The markdown content
 * @returns {string} - The extracted title or a default title
 */
export const extractTitle = (markdown) => {
    if (!markdown) return 'Untitled Document';
    
    // Look for the first h1 heading
    const h1Match = markdown.match(/^# (.+)$/m);
    if (h1Match && h1Match[1]) {
      return h1Match[1].trim();
    }
    
    // If no h1, look for the first line with content
    const lines = markdown.split('\n').filter(line => line.trim() !== '');
    if (lines.length > 0) {
      return lines[0].replace(/^#+\s+/, '').trim() || 'Untitled Document';
    }
    
    return 'Untitled Document';
  };
  
  /**
   * Calculate the reading time of markdown content
   * @param {string} markdown - The markdown content
   * @returns {number} - Estimated reading time in minutes
   */
  export const calculateReadingTime = (markdown) => {
    if (!markdown) return 0;
    
    // Strip markdown syntax
    const text = markdown
      .replace(/#+\s+/g, '')         // Headers
      .replace(/\*\*|\*/g, '')       // Bold and italic
      .replace(/!\[.*?\]\(.*?\)/g, '') // Images
      .replace(/\[.*?\]\(.*?\)/g, '') // Links
      .replace(/```[\s\S]*?```/g, '') // Code blocks
      .replace(/`.*?`/g, '')         // Inline code
      .replace(/\n/g, ' ')           // Newlines
      .replace(/\s+/g, ' ')          // Extra spaces
      .trim();
    
    // Average reading speed: 200 words per minute
    const wordCount = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };
  
  /**
   * Get word count from markdown
   * @param {string} markdown - The markdown content
   * @returns {number} - Word count
   */
  export const getWordCount = (markdown) => {
    if (!markdown) return 0;
    
    // Strip markdown syntax (similar to calculateReadingTime)
    const text = markdown
      .replace(/#+\s+/g, '')
      .replace(/\*\*|\*/g, '')
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`.*?`/g, '')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    return text.split(/\s+/).length;
  };
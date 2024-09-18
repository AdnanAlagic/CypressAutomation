/**
 * Normalize text by replacing non-breaking spaces with regular spaces and trimming.
 * @param {string} text 
 * @returns {string} 
 */
 export const normalizeText = (text) => text.replace(/\u00a0/g, ' ').trim();

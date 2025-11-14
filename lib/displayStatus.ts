/**
 * Shared in-memory storage for review display status
 * 
 * This module provides a centralized way to manage which reviews are approved
 * for display on the public website. In production, this should be replaced
 * with a database (PostgreSQL, MongoDB, etc.) for persistence.
 * 
 * Note: Data stored here is lost on server restart. For production use,
 * implement database persistence.
 */

// In-memory Map storing review ID -> display status
// Key: review ID (number)
// Value: whether review is displayed on website (boolean)
export const displayStatus = new Map<number, boolean>();

/**
 * Gets the display status for a specific review
 * 
 * @param reviewId - The ID of the review
 * @returns true if review is approved for display, false otherwise
 */
export function getDisplayStatus(reviewId: number): boolean {
  return displayStatus.get(reviewId) || false;
}

/**
 * Sets the display status for a specific review
 * 
 * @param reviewId - The ID of the review
 * @param status - Whether the review should be displayed on the website
 */
export function setDisplayStatus(reviewId: number, status: boolean): void {
  displayStatus.set(reviewId, status);
}

/**
 * Gets all review display statuses
 * 
 * @returns Array of objects containing review ID and display status
 */
export function getAllDisplayStatuses(): Array<{ id: number; displayOnWebsite: boolean }> {
  return Array.from(displayStatus.entries()).map(([id, displayOnWebsite]) => ({
    id,
    displayOnWebsite,
  }));
}


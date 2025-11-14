// Shared in-memory storage for display status
// In production, this would be a database
export const displayStatus = new Map<number, boolean>();

export function getDisplayStatus(reviewId: number): boolean {
  return displayStatus.get(reviewId) || false;
}

export function setDisplayStatus(reviewId: number, status: boolean): void {
  displayStatus.set(reviewId, status);
}

export function getAllDisplayStatuses(): Array<{ id: number; displayOnWebsite: boolean }> {
  return Array.from(displayStatus.entries()).map(([id, displayOnWebsite]) => ({
    id,
    displayOnWebsite,
  }));
}


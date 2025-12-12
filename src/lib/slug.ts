// Utility functions for generating and working with URL slugs

/**
 * Generates a URL-friendly slug from a species name
 * @param name - The species common name (e.g., "Paradise Tree", "Neem (Azadirachta)")
 * @returns A URL-friendly slug (e.g., "paradise-tree", "neem-azadirachta")
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Finds a species by its slug
 * @param species - Array of species
 * @param slug - The URL slug to match
 * @returns The matching species or undefined
 */
export function findSpeciesBySlug<T extends { name: string }>(
  species: T[],
  slug: string
): T | undefined {
  return species.find(s => generateSlug(s.name) === slug);
}

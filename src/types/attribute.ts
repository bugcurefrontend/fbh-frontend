// Attribute type for FBH
// Based on user request: name (Text), type (Enumeration), image (Media)

export interface Attribute {
  id: number;
  name: string;
  type: string;
  image: string; // Image URL
}

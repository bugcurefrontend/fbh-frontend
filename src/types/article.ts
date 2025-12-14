// Article type for FBH Activities
export interface Article {
  id: number;
  title: string;
  description: string;
  image: string; // Image URL
  date: string;
  url: string; // External URL to article
  deleted: boolean;
}

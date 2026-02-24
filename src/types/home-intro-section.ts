export interface HomeIntroImage {
  id: number;
  url: string;
  width?: number;
  height?: number;
}

export interface HomeIntroSection {
  title?: string;
  description?: string;
  button_label?: string;
  button_url?: string;
  image?: HomeIntroImage | null;
}

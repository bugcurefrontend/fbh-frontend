import { Attribute } from "./attribute";

export interface MediaItem {
  id: number;
  url: string;
  width?: number;
  height?: number;
}

export interface GlobalContent {
  projects_list_headerimage?: MediaItem | null;
  species_list_headerimage?: MediaItem | null;
  // API has a typo in some environments; support both spellings
  about_us_hearderimage?: MediaItem | null;
  about_us_headerimage?: MediaItem | null;
  our_team_headerimage?: MediaItem | null;
  sample_certificate?: MediaItem | null;
  avatar?: MediaItem | null;
  admin_login_image?: MediaItem | null;
  co2_sequestation?: number | undefined;
  default_attribute?: Attribute | null;
  copyright?: string | null; // markdown/rich text
}
export interface MediaItem {
  id: number;
  url: string;
  width?: number;
  height?: number;
}

export interface AboutContent {
  total_trees_planted?: string;
  total_planting_sites?: string;
  total_volunteers_engaged?: string;
  total_partner_organisations?: string;
  total_countries?: string;
  total_practitioners?: string;
  total_trainers?: string;
  total_meditation_centres?: string;
  our_origin_one?: MediaItem | null;
  our_origin_two?: MediaItem | null;
  our_journey_one?: MediaItem | null;
  our_journey_two?: MediaItem | null;
  our_journey_three?: MediaItem | null;
  our_journey_four?: MediaItem | null;
  our_journey_five?: MediaItem | null;
  our_journey_six?: MediaItem | null;
  our_journey_seven?: MediaItem | null;
}

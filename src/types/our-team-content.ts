export interface GalleryImage {
    id: number;
    url: string;
}

export interface OurTeamContent {
    id: number;
    gallery: GalleryImage[];
}

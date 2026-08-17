export type GalleryCategory =
  | "All"
  | "Performances"
  | "Classrooms"
  | "Student Showcases"
  | "Campus"
  | "Events";

export interface GalleryItem {
  id: number;
  title: string;
  category: GalleryCategory;
  image: string;
  description: string;
  aspectRatio: "portrait" | "landscape" | "square";
}

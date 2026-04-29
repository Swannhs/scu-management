export type TwMainColor =
  | "blue"
  | "gray"
  | "green"
  | "indigo"
  | "pink"
  | "purple"
  | "red"
  | "yellow";

export interface CustomLink {
  label: string;
  href: string;
}

export interface TaxonomyType {
  id?: string;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
}

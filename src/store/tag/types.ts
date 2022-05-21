export const LOCALSTORAGE_KEY_TAGS = "tags";

export interface Tag {
  _id: string;
  slug?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TagState {
  tags: Array<Tag>;
  isLoading: boolean;
}

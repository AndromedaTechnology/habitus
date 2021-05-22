export interface Note {
  _id: string;
  userId?: string;
  content?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type NoteCreateDto = Omit<Note, "_id" | "createdAt" | "updatedAt">;

export interface NoteState {
  notes: Array<Note>;
}

import { GetterTree } from "vuex";
import { NoteState } from "./types";
import { RootState } from "../types";
import { Note } from "@/store/note/types";

export const getters: GetterTree<NoteState, RootState> = {
  notes(state): Array<Note> | undefined {
    const { notes } = state;
    return notes;
  },
  note: (state) => (id: string): Note | undefined => {
    const { notes } = state;
    if (!notes) return undefined;

    return notes.find((item: Note) => {
      return item._id === id;
    });
  },
};

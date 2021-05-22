import { NoteState } from "./types";
import { MutationTree } from "vuex";
import { Note } from "@/store/note/types";

import { NoteCreateDto } from "./types";

export const mutations: MutationTree<NoteState> = {
  updateNote(state, payload: { id: string; data: NoteCreateDto }) {
    const notes = state.notes?.map((item: Note) => {
      if (item._id === payload.id) {
        item = {
          ...item,
          ...payload.data,
        };
      }
      return item;
    });

    state.notes = notes;
  },
  setNotes(state, payload: Array<Note>) {
    state.notes = payload;
  },
};

import { ActionTree } from "vuex";
import { RootState } from "../types";
import { NoteState, Note } from "./types";
import { NoteCreateDto } from "@/store/note/types";

export const LOCALSTORAGE_KEY_NOTES = "notes";

export const actions: ActionTree<NoteState, RootState> = {
  fetchNotes({ commit }): Promise<Array<Note> | null> {
    return new Promise((resolve, reject) => {
      // Fetch from Localstorage
      const itemsLocalStorage: string | null | undefined = localStorage.getItem(
        LOCALSTORAGE_KEY_NOTES
      );

      // Parse
      const items: Array<Note> = itemsLocalStorage
        ? JSON.parse(itemsLocalStorage)
        : [];

      // Commit
      commit("setNotes", items);
      resolve(items);
    });
  },
  updateNote(
    { state, getters, commit },
    payload: { id: string; data: NoteCreateDto }
  ): any {
    commit("updateNote", payload);

    // Save
    const notes = getters["notes"];
    localStorage.setItem(LOCALSTORAGE_KEY_NOTES, JSON.stringify(notes));
  },
  createNote({ state, getters, commit }, data: NoteCreateDto): Promise<Note> {
    return new Promise((resolve, reject) => {
      const note: Note = {
        _id:
          Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15),
        ...data,
        createdAt: new Date(),
      };

      // Append
      const notes = getters["notes"];
      notes.push(note);

      // Persist
      localStorage.setItem(LOCALSTORAGE_KEY_NOTES, JSON.stringify(notes));

      // Resolve
      resolve(note);
    });
  },
  deleteNotes({ commit }): any {
    // Delete from Localstorage

    localStorage.removeItem(LOCALSTORAGE_KEY_NOTES);
  },
  deleteNote({ getters, commit }, note: Note): any {
    // Find
    const notes = getters["notes"];
    const noteIndex: number = notes.findIndex(
      (element: Note) => element._id === note._id
    );

    // Remove
    notes.splice(noteIndex, 1);

    // Persist
    commit("setNotes", notes);
    localStorage.setItem(LOCALSTORAGE_KEY_NOTES, JSON.stringify(notes));
  },
};

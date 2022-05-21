import { MutationTree } from "vuex";
import { TagState, Tag } from "./types";

export const mutations: MutationTree<TagState> = {
  isLoading(state, payload = false) {
    state.isLoading = payload;
  },
  setTags(state, payload: Array<Tag>) {
    state.tags = payload;
  },
  addTag(state, payload: Tag) {
    state.tags = [...state.tags, payload];
  },
  pushTags(state, payload: Array<Tag>) {
    state.tags = [...state.tags, ...payload];
  },
  updateTag(state, payload: { tagId: string; data: any }) {
    state.tags = state.tags?.map((el: Tag) => {
      if (el._id === payload.tagId) {
        el = {
          ...el,
          ...payload.data,
        };
      }
      return el;
    });
  },
  removeTag(state, tagId: string) {
    state.tags = state.tags?.filter((el: Tag) => {
      return el._id !== tagId;
    });
  },
};

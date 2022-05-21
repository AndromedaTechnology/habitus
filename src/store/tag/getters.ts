import { GetterTree } from "vuex";
import { RootState } from "../types";
import { TagState, Tag } from "./types";

export const getters: GetterTree<TagState, RootState> = {
  isLoading(state): boolean | undefined {
    const { isLoading } = state;
    return isLoading;
  },
  tags(state): Array<Tag> | undefined {
    const { tags } = state;
    return tags;
  },
  getTag: (state) => (tagId: string): Tag | undefined => {
    const { tags } = state;
    return tags?.find((item: Tag) => {
      return item._id === tagId;
    });
  },
};

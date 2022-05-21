import { ActionTree } from "vuex";
import { RootState } from "../types";
import { TagState, Tag } from "./types";
import { TagHelpers } from "./helpers";

export const actions: ActionTree<TagState, RootState> = {
  async fetchTags({ commit }): Promise<Array<Tag>> {
    commit("setTags", []);
    // Api
    commit("isLoading", true);
    const itemsApi = await TagHelpers.fetchGlobalTags();
    commit("pushTags", itemsApi);
    commit("isLoading", false);
    // Return
    return Promise.resolve([...itemsApi]);
  },
  async persistTag(
    { state, getters, commit },
    tag: Tag
  ): Promise<Tag | undefined> {
    const tagCreated = await TagHelpers.persistTag(tag);
    commit("addTag", tagCreated);
    return Promise.resolve(tagCreated);
  },
};

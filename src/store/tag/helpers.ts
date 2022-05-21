import apiClient from "@/apiClient";
import { Tag, LOCALSTORAGE_KEY_TAGS } from "./types";

export class TagHelpers {
  /**
   * Fetch Tags
   *
   * @returns {Promise<Array<Tag>>}
   */
  static async fetchTags(): Promise<Array<Tag>> {
    return await this.fetchGlobalTags();
  }

  /**
   * Fetch Tags Global.
   * From API.
   *
   * @returns {Promise<Array<Tag> | undefined>}
   */
  static async persistTag(tag: Tag): Promise<Tag | undefined> {
    try {
      const response = await apiClient.post("/tags", tag);
      return response ? response.data : undefined;
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Get Tags Global.
   * Fetch From API or return cached.
   *
   * @returns {Promise<Array<Tag> | undefined>}
   */
  static async fetchGlobalTags(): Promise<Array<Tag>> {
    const items = await this.fetchGlobalTagsFromApi();
    if (items) {
      this.cacheGlobalTags(items);
      return items;
    }
    return this.getCachedGlobalTags();
  }

  /**
   * Fetch Tags Global.
   * From API.
   *
   * @returns {Promise<Array<Tag> | undefined>}
   */
  private static async fetchGlobalTagsFromApi(): Promise<
    Array<Tag> | undefined
  > {
    try {
      const response = await apiClient.get("/tags");
      return response ? response.data : undefined;
    } catch (e) {
      return undefined;
    }
  }

  /**
   * From LocalStorage.
   *
   * @returns {Array<Tag>}
   */
  private static getCachedGlobalTags(): Array<Tag> {
    const ls: string | null | undefined = localStorage.getItem(
      LOCALSTORAGE_KEY_TAGS
    );
    const items: Array<Tag> = ls ? JSON.parse(ls) : [];
    return items;
  }

  static cacheGlobalTags(items: Array<Tag>) {
    localStorage.setItem(LOCALSTORAGE_KEY_TAGS, JSON.stringify(items));
  }
}

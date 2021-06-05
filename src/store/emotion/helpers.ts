import apiClient from '../../apiClient';
import { Emotion, LOCALSTORAGE_KEY_EMOTIONS } from './types';

/**
 * EmotionHelpers
 * Primarily covers fetching, caching.
 * Should be renamed.
 *
 * Overwrites Store and LocalStorage with API data,
 * if available.
 * Otherwise, returns LocalStorage data.
 *
 */
export class EmotionHelpers {
  /**
   * Fetch Emotions
   * From API and Cache.
   *
   * @returns {Promise<Array<Emotion> | undefined>}
   */
  static async fetchEmotions(): Promise<Array<Emotion> | undefined> {
    const api = await this.getFromApi();
    const cache = this.getFromCache();

    if (api) {
      return Promise.resolve(api);
    }
    return Promise.resolve(cache);
  }

  /**
   * Get From API
   *
   * @returns {Promise<Array<Emotion> | undefined>}
   */
  static async getFromApi(): Promise<Array<Emotion> | undefined> {
    try {
      const response = await apiClient.get("/emotions");
      return response ? response.data : undefined;
    } catch (e) {
      return undefined;
    }
  }

  /**
   * Get From Cache
   * Cache is LocalStorage.
   *
   * @returns {Array<Emotion>}
   */
  static getFromCache(): Array<Emotion> {
    const ls:
      | string
      | null
      | undefined = localStorage.getItem(LOCALSTORAGE_KEY_EMOTIONS);
    const items: Array<Emotion> = ls
      ? JSON.parse(ls)
      : [];
    return items;
  }

  /**
   * Cache Store
   *
   * @param {any} getters
   */
  static cacheStore(getters: any) {
    const items: Array<Emotion> | undefined = getters["emotions"];
    this.cacheItems(items);
  }

  /**
   * Cache Items
   * To LocalStorage.
   *
   * @param {Array<Emotion> | undefined} items
   */
  static cacheItems(items: Array<Emotion> | undefined) {
    localStorage.setItem(LOCALSTORAGE_KEY_EMOTIONS, JSON.stringify(items));
  }
}
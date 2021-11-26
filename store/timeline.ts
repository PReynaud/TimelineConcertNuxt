import { defineStore } from 'pinia';
import ShowsData from '~/content/data.json';
import Show from '~/models/Show.model';

interface TimelineState {
  shows: Show[];
  isLoading: boolean;
}

export const useTimelineStore = defineStore('timeline', {
  state: (): TimelineState => ({
    shows: [],
    isLoading: false
  }),

  actions: {
    async fetchShows() {
      const { results } = ShowsData;
      this.isLoading = true;
      await setTimeout(() => {
        this.shows = results.map((result) => Show.fromJson(result));
      }, 500);
      this.isLoading = false;
    },

    updateItem(itemId: string, newValues: Show) {
      const indexToUpdate = this.shows.findIndex((item) => item.id === itemId);
      if (indexToUpdate) {
        this.shows[indexToUpdate] = newValues;
      }
    }
  }
});

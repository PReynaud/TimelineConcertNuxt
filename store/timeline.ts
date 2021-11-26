import { defineStore } from 'pinia';
import ShowsData from '~/content/data.json';
import Show from '~/models/Show.model';

interface TimelineState {
  shows: Show[];
  isLoading: boolean;
  searchText: string;
}

export const useTimelineStore = defineStore('timeline', {
  state: (): TimelineState => ({
    shows: [],
    isLoading: false,
    searchText: ''
  }),

  getters: {
    filteredShows: (state) => {
      if (state.searchText) {
        return state.shows.filter((show) =>
          show.band.name
            .toLowerCase()
            .includes(state.searchText.trim().toLowerCase())
        );
      }
      return state.shows;
    }
  },

  actions: {
    async fetchShows() {
      const { results } = ShowsData;
      this.isLoading = true;
      await setTimeout(() => {
        this.shows = results.map((result) => Show.fromJson(result));
      }, 500);
      this.isLoading = false;
    },

    setSearchText(searchText: string) {
      this.searchText = searchText;
    }
  }
});

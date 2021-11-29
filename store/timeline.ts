import { defineStore } from 'pinia';
import { flow, map, uniq, filter } from 'lodash/fp';
import ShowsData from '~/content/data.json';
import Show from '~/models/Show.model';

interface TimelineState {
  shows: Show[];
  isLoading: boolean;
  searchText: string;
  selectedLocationId: string;
}

export const useTimelineStore = defineStore('timeline', {
  state: (): TimelineState => ({
    shows: [],
    isLoading: false,
    searchText: '',
    selectedLocationId: ''
  }),

  getters: {
    filteredShows: (state) => {
      let result = state.shows;

      if (state.searchText) {
        result = result.filter((show) =>
          show.band.name
            .toLowerCase()
            .includes(state.searchText.trim().toLowerCase())
        );
      }
      if (state.selectedLocationId) {
        result = result.filter(
          (show) => show.place?.id === state.selectedLocationId
        );
      }

      return result;
    },

    allAvailablePlaces: (state): string[] => {
      return flow(
        filter((show) => show !== undefined && show !== null),
        map((show: Show) => ({ name: show.place?.name, id: show.place?.id })),
        filter((place) => place.id !== undefined && place.id !== null),
        uniq
      )(state.shows);
    }
  },

  actions: {
    async fetchShows() {
      const { results } = ShowsData;
      this.isLoading = true;
      await setTimeout(() => {
        this.shows = results.map((result) => Show.fromJson(result));
        this.isLoading = false;
      }, 2000);
    },

    search(searchText: string | null, selectedLocationId: string | null) {
      this.searchText = searchText ?? '';
      this.selectedLocationId = selectedLocationId ?? '';
    }
  }
});

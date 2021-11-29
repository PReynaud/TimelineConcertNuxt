<template>
  <LoadingContainer v-if="isLoading" />

  <v-container v-else fluid>
    <v-timeline v-if="showList.length > 0">
      <div v-for="[year, showsByYear] in showList" :key="`${year}`">
        <v-timeline-item left hide-dot>
          <div class="float-right">
            <h2>{{ year }}</h2>
          </div>
        </v-timeline-item>

        <v-slide-x-transition
          v-for="uniqueShow in showsByYear"
          :key="`${year}-${uniqueShow.id}`"
          group
        >
          <v-timeline-item :key="`${year}-${uniqueShow.id}`" right>
            <template #opposite>{{ formatDate(uniqueShow.date) }}</template>
            <TimelineCard :item="uniqueShow" />
          </v-timeline-item>
        </v-slide-x-transition>
      </div>
    </v-timeline>

    <div v-else class="d-flex align-center justify-center">
      Pas de données disponibles
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue-demi';
import { flow, orderBy, groupBy, toPairs, reverse } from 'lodash/fp';
import TimelineCard from './TimelineCard.vue';
import LoadingContainer from './LoadingContainer.vue';
import Show from '~/models/Show.model';
import { useTimelineStore } from '~/store/timeline';
import { formatDate, getYear } from '~/utils/date.utils';

export default defineComponent({
  components: { TimelineCard, LoadingContainer },
  setup() {
    const timelineStore = useTimelineStore();
    const filteredShows = computed(() => timelineStore.filteredShows);
    const isLoading = computed(() => timelineStore.isLoading);
    const cleanedShowList = computed(() =>
      flow(
        orderBy(['date'], ['desc']),
        groupBy((show: Show) => getYear(show.date)),
        toPairs,
        reverse
      )(filteredShows.value)
    );

    onMounted(async () => {
      await timelineStore.fetchShows();
    });

    return {
      isLoading,
      showList: cleanedShowList,
      formatDate
    };
  }
});
</script>

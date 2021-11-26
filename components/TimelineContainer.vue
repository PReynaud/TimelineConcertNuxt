<template>
  <LoadingContainer v-if="isLoading" />

  <v-container v-else>
    <v-timeline>
      <template v-for="(showsByYear, propertyName) in groupByShowList">
        <v-timeline-item :key="`${propertyName}`" left hide-dot>
          <div class="float-right">
            <h2>{{ propertyName }}</h2>
          </div>
        </v-timeline-item>

        <v-slide-x-transition
          v-for="uniqueShow in showsByYear"
          :key="`${propertyName}-${uniqueShow.id}`"
          group
        >
          <v-timeline-item :key="`${propertyName}-${uniqueShow.id}`" right>
            <template #opposite>{{ formatDate(uniqueShow.date) }}</template>
            <TimelineCard :item="uniqueShow" />
          </v-timeline-item>
        </v-slide-x-transition>
      </template>
    </v-timeline>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watchEffect } from 'vue-demi';
import { groupBy, orderBy } from 'lodash';
import TimelineCard from './TimelineCard.vue';
import LoadingContainer from './LoadingContainer.vue';
import Show from '~/models/Show.model';
import { useTimelineStore } from '~/store/timeline';
import { formatDate, getYear } from '~/utils/date.utils';

export default defineComponent({
  components: { TimelineCard, LoadingContainer },
  setup() {
    const timelineStore = useTimelineStore();
    const showList = computed(() => timelineStore.shows);
    const isLoading = computed(() => timelineStore.isLoading);
    const sortedShowList = computed(() =>
      orderBy(showList.value, ['date'], ['desc'])
    );

    watchEffect(() => {
      console.log(sortedShowList);
    });

    const groupByShowList = computed(() => {
      return groupBy(sortedShowList.value, (show: Show) => getYear(show.date));
    });

    onMounted(async () => {
      await timelineStore.fetchShows();
    });

    return {
      isLoading,
      groupByShowList,
      formatDate
    };
  }
});
</script>

<template
  >
  <v-timeline large>
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
          <template #opposite>
            {{ formatDate(uniqueShow.date) }}
          </template>

          <TimelineCard :item="uniqueShow" />
        </v-timeline-item>
      </v-slide-x-transition>
    </template>

    <v-timeline-item v-intersect="infiniteScrolling">
      <v-row class="d-flex align-center justify-center">
        <v-progress-circular
          v-if="isLoading"
          color="secondary"
          size="30"
        ></v-progress-circular>
      </v-row>
    </v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { formatDate } from '@/utils/date.utils';
import Show from '@/models/Show.model';
import { sortBy, groupBy } from 'lodash';
import { getYear } from 'date-fns';
import { actionTypes, getterTypes } from '@/store/timeline/timeline.types';
import { Getter, Action } from 'vuex-class';
import TimelineCard from './TimelineCard.vue';

@Component({
  components: {
    TimelineCard
  }
})
export default class TimelineContainer extends Vue {
  formatDate = formatDate;
  isLoading = false;

  // showList: Show[] = [
  //   new Show(
  //     '1',
  //     parseDate('05/03/2020'),
  //     new Band('Alcest'),
  //     new Place('Ninkasi KAO', undefined, undefined, 'Lyon', 'France')
  //   ),
  //   new Show('2', parseDate('05/02/2020'), new Band('Insomnium'))
  // ];

  @Getter(getterTypes.GET_SHOW_LIST)
  showList!: Show[];

  @Action(actionTypes.FETCH_SHOW_LIST)
  fetchShowList!: () => void;

  get groupByShowList() {
    return groupBy(this.sortedShowList, (show: Show) => getYear(show.date));
  }

  get sortedShowList(): Show[] {
    return sortBy(this.showList, 'date');
  }

  infiniteScrolling() {
    console.log('should load');
  }

  mounted() {
    this.fetchShowList();
  }
}
</script>

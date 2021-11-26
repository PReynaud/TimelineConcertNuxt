<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <FiltersContainer />
      </v-col>

      <v-col>
        <TimelineContainer />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import TimelineContainer from '@/components/TimelineContainer.vue';
import FiltersContainer from '~/components/filters/FiltersContainer.vue';

export default Vue.extend({
  components: {
    TimelineContainer,
    FiltersContainer
  }
});
</script>

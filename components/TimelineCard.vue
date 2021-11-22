<template>
  <v-card class="timeline-card">
    <v-card-title>
      {{ item.band.name }}
    </v-card-title>
    <v-card-text>
      <div v-if="displayPlace" class="timeline-card__place d-flex align-center">
        <v-icon class="mr-2">{{ icons.mdiMapMarker }}</v-icon>
        <span>{{ displayPlace }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from '@nuxtjs/composition-api';
import Show from '@/models/Show.model';
import { mdiMapMarker } from '@mdi/js';

interface TimelineCardProps {
  item: Show;
}

export default defineComponent({
  props: {
    item: {
      type: Show,
      required: true
    }
  },
  setup(props: TimelineCardProps) {
    const { item } = toRefs(props);

    const icons = {
      mdiMapMarker
    };

    const displayPlace = computed(() => item.value.place?.display || null);

    return {
      displayPlace,
      icons
    };
  }
});
</script>

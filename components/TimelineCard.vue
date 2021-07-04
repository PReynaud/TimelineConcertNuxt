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
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Show from '@/models/Show.model';
import { mdiMapMarker } from '@mdi/js';

@Component({})
export default class TimelineCard extends Vue {
  icons = {
    mdiMapMarker
  };

  @Prop({ type: Show, required: true })
  item!: Show;

  get displayPlace(): string | null {
    return this.item.place?.display || null;
  }
}
</script>

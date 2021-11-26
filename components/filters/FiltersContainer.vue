<template>
  <v-sheet rounded="lg">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="searchText"
            :append-icon="'mdi-search'"
            label="Mots clés"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select v-model="selectedPlaceId" :items="[]" label="Emplacement" />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="info" class="float-end" @click="launchSearch"
            >Rechercher</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue-demi';
import { useTimelineStore } from '~/store/timeline';

export default defineComponent({
  setup() {
    const timelineStore = useTimelineStore();

    const searchText = ref('');
    const selectedPlaceId: Ref<string | null> = ref(null);

    const launchSearch = () => {
      timelineStore.setSearchText(searchText.value);
    };

    return {
      searchText,
      selectedPlaceId,
      launchSearch
    };
  }
});
</script>

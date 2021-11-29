<template>
  <v-sheet rounded="lg">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            v-model="searchText"
            clearable
            label="Mots clés"
            :loading="isLoading"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-select
            v-model="selectedPlaceId"
            :items="allAvailablePlaces"
            item-text="name"
            item-value="id"
            :loading="isLoading"
            label="Emplacement"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-btn color="info" class="float-end" @click="launchSearch">
            Rechercher
            <v-icon right>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue-demi';
import { useTimelineStore } from '~/store/timeline';

export default defineComponent({
  setup() {
    const timelineStore = useTimelineStore();
    const allAvailablePlaces = computed(() => [
      ...timelineStore.allAvailablePlaces,
      {
        name: 'Tous',
        id: ''
      }
    ]);
    const isLoading = computed(() => timelineStore.isLoading);

    const searchText = ref('');
    const selectedPlaceId: Ref<string | null> = ref(null);

    const launchSearch = () => {
      timelineStore.search(
        searchText.value ?? null,
        selectedPlaceId.value ?? null
      );
    };

    return {
      searchText,
      selectedPlaceId,
      allAvailablePlaces,
      isLoading,
      launchSearch
    };
  }
});
</script>

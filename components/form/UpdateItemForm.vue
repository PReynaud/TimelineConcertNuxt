<template>
  <v-form v-if="showToUpdate" v-model="valid">
    <v-container>
      <v-row>
        <v-text-field
          v-model="showToUpdate.band.name"
          :rules="stringRequiredRule"
          label="Band name"
          required
        ></v-text-field>
      </v-row>

      <v-row>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import {
  computed,
  defineComponent,
  onMounted,
  Ref,
  ref,
  watch
} from 'vue-demi';
import Show from '~/models/Show.model';
import { useTimelineStore } from '~/store/timeline';

export default defineComponent({
  setup() {
    const timelineStore = useTimelineStore();
    const showList = computed(() => timelineStore.shows);
    let showToUpdate: Ref<Show | null> = ref(null);

    watch(showList, () => {
      showToUpdate = ref(cloneDeep(showList.value[0]));
    });

    const valid = ref(false);
    const stringRequiredRule = [
      (v: string) => !!v || 'Name is required',
      (v: string) => v.length <= 10 || 'Name must be less than 10 characters'
    ];

    const validate = () => {
      if (showToUpdate.value) {
        timelineStore.updateItem('0', showToUpdate.value);
        (this as any).$router.push({ name: 'default' });
      }
    };

    onMounted(async () => {
      await timelineStore.fetchShows();
    });

    return {
      valid,
      showToUpdate,
      stringRequiredRule,
      validate
    };
  }
});
</script>

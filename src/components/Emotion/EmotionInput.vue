<template>
  <v-alert v-if="emotions && emotions.length" class="text-center">
    <div class="pa-12">
      <h1>How do you feel?</h1>
      <EmotionItem
        class="ma-4"
        v-for="(emotion) in emotions"
        x-large
        :emotion="emotion"
        :key="emotion._id"
        @click.native="emitSelectedId(emotion._id)"
      />
    </div>
  </v-alert>
</template>
<script lang="ts">
import Vue from "vue";
import EmotionItem from './EmotionItem.vue';
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Emotion } from "@/store/emotion/types";
@Component({
  name: "EmotionInput",
  components: {
    EmotionItem,
  }
})
export default class EmotionInput extends Vue {
  @Prop({ type: Array, required: true, default: undefined }) emotions?: Array<Emotion>;

  emitSelectedId(id: string) {
    this.$emit("selectedId", id);
  }
}
</script>

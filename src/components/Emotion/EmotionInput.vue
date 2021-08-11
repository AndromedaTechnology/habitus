<template>
  <div v-if="emotions && emotions.length">
    <div class="mt-12 mb-4 text-center">
      <h1>How do you feel?</h1>
    </div>
    <v-tabs
      centered
      optional
      show-arrows
      height="96px"
      slider-size="8"
      slider-color="#121212"
      :active-class="undefined"
    >
      <v-tabs-slider color="#121212"></v-tabs-slider>
      <v-tab
        v-for="(emotion) in emotions" :key="emotion._id"
        style="background-color: #121212 !important; cursor: default;"
      >
        <EmotionItem
          class="ma-2"
          style="cursor: pointer;"
          x-large
          :emotion="emotion"
          @click.native="emitSelectedId(emotion._id)"
        />
      </v-tab>
    </v-tabs>
  </div>
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
<style lang="scss">
.theme--dark.v-tabs > .v-tabs-bar {
  background: none !important;
}
</style>
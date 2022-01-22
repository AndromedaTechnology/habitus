<template>
  <div>
    <div class="mb-4 text-center">
      <h1>
        <vue-typer
          text="How do you feel?"
          :repeat="0"
          :preTypeDelay="300"
        ></vue-typer>
      </h1>
    </div>
    <v-tabs
      v-if="emotions && emotions.length"
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
    <v-tabs
      v-if="isLoading"
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
        v-for="index in 12" :key="index"
        style="background-color: #121212 !important; cursor: default;"
      >
        <v-skeleton-loader
          class="d-inline-block"
          max-width="300"
          type="chip"
        ></v-skeleton-loader>
      </v-tab>
    </v-tabs>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { VueTyper } from 'vue-typer';
import EmotionItem from './EmotionItem.vue';
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Emotion } from "@/store/emotion/types";
@Component({
  name: "EmotionInput",
  components: {
    VueTyper,
    EmotionItem,
  }
})
export default class EmotionInput extends Vue {
  @Prop({ type: Array, required: true, default: undefined }) emotions?: Array<Emotion>;
  @Prop({ type: Boolean, required: false, default: false }) isLoading?: boolean;

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
<style lang="scss">
.vue-typer {
  .custom.char {
    color: white;
  }
}
</style>
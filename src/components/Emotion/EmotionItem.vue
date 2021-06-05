<template>
  <v-btn :key="emotion._id" x-large>
    <h2>
      <span class="mr-4">
        {{ emotion.emoji }}
      </span>
      <span>
        {{ emotion.name }}
      </span>
    </h2>
  </v-btn>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Emotion } from "@/store/emotion/types";
@Component({
  name: "EmotionItem",
})
export default class EmotionItem extends Vue {
  @Prop({ type: Object, required: true, default: undefined }) emotion!: Emotion;
}
</script>

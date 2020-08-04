<template>
  <div class="impact">
    <v-slider
      v-model="impactNew"
      :color="color"
      track-color="grey"
      always-dirty
      min="1"
      max="5"
      thumb-label="always"
      :thumb-size="24"
    >
      <template v-slot:prepend>
        <v-icon :color="color" @click="decrement">navigate_before</v-icon>
      </template>

      <template v-slot:append>
        <v-icon :color="color" @click="increment">navigate_next</v-icon>
      </template>

      <template v-slot:thumb-label="{ value }">
        <h3 class="mb-12 pb-12">{{ impactNames[value - 1] }}</h3>
      </template>
    </v-slider>
  </div>
</template>

<script lang="ts">
import { State } from "vuex-class";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({
  name: "Impact",
  components: {},
})
export default class Impact extends Vue {
  @Prop({ default: 1 }) impact?: number;

  @State("names", { namespace: "impact" }) impactNames!: Array<string>;
  @State("colors", { namespace: "impact" }) impactColors!: Array<string>;

  impactNew = 1;

  get color() {
    if (this.impactNew < 2) return this.impactColors[0];
    if (this.impactNew < 3) return this.impactColors[1];
    if (this.impactNew < 4) return this.impactColors[2];
    if (this.impactNew < 5) return this.impactColors[3];
    return this.impactColors[4];
  }

  decrement() {
    this.impactNew--;
  }

  increment() {
    this.impactNew++;
  }

  @Watch("impact", { immediate: true })
  impactChanged(value: any, oldValue: any) {
    this.impactNew = value ? value : 1;
  }

  @Watch("impactNew")
  impactNewChanged(value: any, oldValue: any) {
    this.emitUpdate(value);
  }

  emitUpdate(data: null) {
    this.$emit("update", data);
  }
}
</script>

<style lang="scss" >
.impact {
  .v-slider__thumb-label {
    bottom: 6px !important;
    left: 6px !important;
  }

  .v-slider__thumb {
    width: 24px !important;
    height: 24px !important;

    &:before {
      left: -6px !important;
      top: -6px !important;
    }
  }
}
</style>

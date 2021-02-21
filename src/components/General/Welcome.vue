<template>
  <div class="text-center">
    <h1>
      <vue-typer
        :text="text1"
        :repeat="0"
        @typed='onText1Typed'
      ></vue-typer>
    </h1>
    <h2 v-if="isText1Typed" class="mt-12">
      <vue-typer
        :text="text2"
        :repeat="0"
        :pre-type-delay='1000'
        :erase-on-complete="true"
        :pre-erase-delay='8000'
        erase-style="clear"
        @typed='onText2Typed'
        @erased="onText2Erased"
      ></vue-typer>
    </h2>
    <div v-if="isText2Typed" class="mt-12 pt-12">
      <v-chip color="green" label class="ma-4 px-4" large><h3>Easy to use</h3></v-chip>
      <v-chip color="blue" label class="ma-4 px-4" large><h3>Anonymous</h3></v-chip>
      <v-chip color="purple" label class="ma-4 px-4" large><h3>Open-Source</h3></v-chip>
    </div>
  </div>
</template>
<script lang="ts">
import { VueTyper } from "vue-typer";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Welcome",
  components: {
    VueTyper
  },
})
export default class Welcome extends Vue {
  isText1Typed = false;
  text1 = "Welcome to Habitus 🙌";
  isText2Typed = false;
  text2 = "Track Your Habits,\nWrite Your Journal."
  onText1Typed() {
    this.isText1Typed = true;
  }
  onText2Typed() {
    this.isText2Typed = true;
  }
  onText2Erased() {
    this.emitDone();
  }
  emitDone() {
    this.$emit("done");
  }
}
</script>
<style lang="scss">
.vue-typer {
  .custom.char {
    color: white;
  }
}
</style>
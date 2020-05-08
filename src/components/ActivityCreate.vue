<template>
  <div class="activityCreate">
    <h1>Add Activity</h1>
    <input
      type="text"
      placeholder="Count"
      v-model="count"
      @keyup.enter="submit()"
    />
    <button @click="submit()">Save</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActivityCreate extends Vue {
  count = 0;

  submit() {
    this.$emit("submit", this.count);
  }
}
</script>

<style scoped lang="scss"></style>

<template>
  <div class="activityCreate">
    <!-- <h1>Add Activity</h1> -->
    <input
      type="text"
      placeholder="Amount"
      v-model="amount"
      @keyup.enter="submit()"
    />
    <br />
    <button @click="submit()">Save</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActivityCreate extends Vue {
  amount = 0;

  submit() {
    this.$emit("submit", this.amount);
  }
}
</script>

<style scoped lang="scss"></style>

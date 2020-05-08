<template>
  <div class="habitCreate">
    <input
      type="text"
      placeholder="Name"
      v-model="name"
      @keyup.enter="submit()"
    />
    <button class="btn-dark" @click="submit()">Add</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HabitCreate extends Vue {
  name: string | null = null;

  submit() {
    this.$emit("submit", this.name);
  }
}
</script>

<style scoped lang="scss">
.habitCreate {
  text-align: center;
}
</style>

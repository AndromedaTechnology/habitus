<template>
  <div class="habitCreate">
    <input
      class="name"
      type="text"
      placeholder="Name"
      v-model="name"
      @keyup.enter="submit()"
    />

    <toggle-button
      class="isGood"
      v-model="isGood"
      :labels="{ checked: 'Good', unchecked: 'Bad' }"
      :switch-color="{ checked: '#42b983', unchecked: '#b94278' }"
      :font-size="16"
      :width="128"
      :height="32"
    />

    <button class="btn-dark submit" @click="submit()">Add</button>
  </div>
</template>

<script lang="ts">
import { ToggleButton } from "vue-js-toggle-button";
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {
    ToggleButton,
  },
})
export default class HabitCreate extends Vue {
  name: string | null = null;
  isGood = true;

  submit() {
    this.$emit("submit", { name: this.name, isGood: this.isGood });
  }
}
</script>

<style scoped lang="scss">
.habitCreate {
  text-align: center;

  .name,
  .submit {
    margin: 32px auto;
    display: block;
  }
}
</style>

<template>
  <div class="habitCreate">
    <v-switch
      inset
      v-model="isGood"
      :label="isGood ? 'Good' : 'Bad'"
      :color="isGood ? '#42b983' : '#b94278'"
    ></v-switch>

    <v-text-field
      class="mt-8"
      v-model="name"
      label="Name"
      solo
      autocomplete="off"
      @keyup.enter="submit()"
    ></v-text-field>

    <v-btn block @click="submit()">Save</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HabitAmountType } from "@/store/habit/types";

@Component({})
export default class HabitCreate extends Vue {
  name: string | null = null;
  isGood = true;
  amountType = HabitAmountType.amount;

  submit() {
    this.$emit("submit", {
      name: this.name,
      isGood: this.isGood,
      amountType: this.amountType
    });
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

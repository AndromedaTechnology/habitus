<template>
  <div class="habitCreate">
    <input v-model="name" type="text" placeholder="Name" @keyup.enter="submit()" class="name" />

    <toggle-button
      v-model="isGood"
      :labels="{ checked: 'Good', unchecked: 'Bad' }"
      :switch-color="{ checked: '#42b983', unchecked: '#b94278' }"
      :font-size="16"
      :width="128"
      :height="32"
      class="isGood"
    />

    <select v-model="amountType" class="amountType">
      <option value="amount">Points</option>
      <option value="timer">Time</option>
    </select>

    <button class="btn-dark submit" @click="submit()">Add</button>
  </div>
</template>

<script lang="ts">
import { ToggleButton } from "vue-js-toggle-button";
import { Component, Prop, Vue } from "vue-property-decorator";
import { HabitAmountType } from "@/store/habit/types";

@Component({
  components: {
    ToggleButton
  }
})
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
  .amountType,
  .submit {
    margin: 32px auto;
    display: block;
  }
}
</style>

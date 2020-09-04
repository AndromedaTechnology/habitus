<template>
  <div class="habitCreate">
    <v-switch
      inset
      v-model="isGood"
      :label="isGood ? 'Good' : 'Bad'"
      :color="isGood ? '#42b983' : '#b94278'"
    ></v-switch>

    <HabitNameEmojiInput
      :name="name"
      :emoji="emoji"
      @set:name="name = $event"
      @set:emoji="emoji = $event"
      @submit="
        ($event) => {
          name = $event.name;
          emoji = $event.emoji;
          submit();
        }
      "
    />

    <v-btn block @click="submit()">Save</v-btn>
  </div>
</template>

<script lang="ts">
import { HabitAmountType } from "@/store/habit/types";

import HabitNameEmojiInput from "./HabitNameEmojiInput.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({ components: { HabitNameEmojiInput } })
export default class HabitCreate extends Vue {
  name: string | null = null;
  emoji: string | null = null;
  isGood = true;
  amountType = HabitAmountType.amount;

  submit() {
    this.$emit("submit", {
      name: this.name,
      emoji: this.emoji,
      isGood: this.isGood,
      amountType: this.amountType,
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

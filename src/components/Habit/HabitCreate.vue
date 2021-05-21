<template>
  <v-alert class="py-4">
    <v-switch
      inset
      v-model="isGood"
      class="px-8 py-4"
      :label="isGood ? 'Good' : 'Bad'"
      :color="isGood ? colors.GOOD : colors.BAD"
    ></v-switch>
    <HabitNameEmojiInput
      :name="name"
      :emoji="emoji"
      class="px-8 py-4"
      @set:name="name = $event"
      @set:emoji="emoji = $event"
      @submit="submit()"
    />
    <v-btn block @click="submit()" x-large class="py-4">
      <v-icon>save</v-icon>
      <h3>
        Save
      </h3>
    </v-btn>
  </v-alert>
</template>
<script lang="ts">
import { COLORS } from "@/helpers/enums";
import { HabitAmountType } from "@/store/habit/types";
import { Component, Vue } from "vue-property-decorator";
import HabitNameEmojiInput from "./HabitNameEmojiInput.vue";
@Component({
  components: {
    HabitNameEmojiInput
  }
})
export default class HabitCreate extends Vue {
  name: string | null = null;
  emoji: string | null = null;
  isGood = true;
  amountType = HabitAmountType.amount;

  colors: any = COLORS;

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

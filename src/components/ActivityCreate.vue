<template>
  <div class="activityCreate">
    <button class="btn-dark" @click="decreaseAmount()">-</button>
    <input
      type="text"
      class="amount"
      v-model="amount"
      @keyup.enter="submit()"
    />
    <button class="btn-dark" @click="increaseAmount()">+</button>

    <button class="btn-dark" @click="submit()">Add</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class ActivityCreate extends Vue {
  amount = 0;

  submit() {
    this.$emit("submit", this.amount);
    this.amount = 0;
  }

  increaseAmount() {
    this.amount += 1;
  }
  decreaseAmount() {
    this.amount -= 1;
    this.amount = Math.max(this.amount, 0);
  }
}
</script>

<style scoped lang="scss">
.activityCreate {
  display: flex;
  .amount {
    width: 24px;
  }
}
</style>

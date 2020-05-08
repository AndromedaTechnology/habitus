<template>
  <div>
    <HabitCreate @submit="habitCreateSubmit($event)" />
  </div>
</template>

<script lang="ts">
import { Action } from "vuex-class";
import HabitCreate from "@/components/HabitCreate.vue";

import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Home",
  components: {
    HabitCreate,
  },
})
export default class Home extends Vue {
  @Action("persistHabit", { namespace: "habit" }) persistHabit: any;

  habitCreateSubmit(name: string) {
    this.persistHabit({
      name: name,
    });
    this.$router.push({ name: "Home" });
  }
}
</script>

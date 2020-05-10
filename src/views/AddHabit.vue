<template>
  <div>
    <HabitCreate @submit="habitCreateSubmit($event)" />
  </div>
</template>

<script lang="ts">
import { Action, Getter } from "vuex-class";
import HabitCreate from "@/components/HabitCreate.vue";
import { HabitType } from "@/store/habit/types";
import { User } from "@/store/user/types";

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
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Getter("user", { namespace: "user" }) user: User | undefined;

  mounted() {
    this.fetchUser();
  }

  habitCreateSubmit(name: string) {
    this.persistHabit({
      name: name,
      type: HabitType.amount,
      repeatInSeconds: 0,
      startsAtDate: new Date(),
      endsAtDate: null,
      userId: this.user?._id,
    });

    this.$router.push({ name: "home" });
  }
}
</script>

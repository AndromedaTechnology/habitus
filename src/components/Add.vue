<template>
  <v-container v-if="user" fluid>
    <v-row class="mt-12">
      <v-col :cols="habit ? 8 : 12">
        <v-select
          solo
          v-model="habitListSelected"
          :items="habitList"
          item-text="name"
          return-object
          label="Select a Habit"
          d-inline
        ></v-select>
      </v-col>
      <v-col v-if="habit" :cols="4">
        <v-btn class="pa-4" fill-height block @click="saveActivity()">Add</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { User } from "@/store/user/types";
import { Habit } from "@/store/habit/types";

import _ from "lodash";
import { Action, Getter } from "vuex-class";
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "Add",
  components: {}
})
export default class Add extends Vue {
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Getter("user", { namespace: "user" }) user: User | undefined;

  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Getter("getHabit", { namespace: "habit" }) getHabit!: (
    habitId: string
  ) => Promise<Habit | undefined>;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;

  @Action("persistActivity", { namespace: "activity" }) persistActivity: any;

  habitListSelected:
    | Habit
    | {
        name: string;
        isCreateNew: boolean;
      }
    | null = null;
  habit: Habit | null = null;

  get habitList(): Array<Habit> {
    const value = this.habits ? _.cloneDeep(this.habits) : [];

    // 'Create new' item

    value.splice(0, 0, {
      name: "Create new!",
      isCreateNew: true
    });

    return value;
  }

  mounted() {
    this.fetchUser();
    this.fetchHabits();
  }

  @Watch("$route", {
    immediate: true,
    deep: true
  })
  onRouteChanged(route: any, oldRoute: any) {
    if (route.name === "habit") {
      this.getHabit(route.params.id).then((habit: Habit | undefined) => {
        this.habitListSelected = habit ? habit : null;
      });
    } else {
      this.habitListSelected = null;
    }
  }

  @Watch("habitListSelected", {
    immediate: true,
    deep: true
  })
  habitListSelectedChanged(value: any, oldValue: any) {
    this.$nextTick(() => {
      if (value) {
        if (value.isCreateNew) {
          this.habit = null;
          this.$router.push({ name: "habitCreate" });
          this.habitListSelected = null;
        } else if (value._id) {
          this.habit = value;
          this.$router.push({ name: "habit", params: { id: value._id } });
        }
      } else {
        this.habit = null;
      }
    });
  }

  saveActivity() {
    this.persistActivity({
      habit: this.habit,
      user: this.user,
      amount: 1
    });

    this.$router.push({ name: "habit", params: { id: this.habit!._id } });
  }
}
</script>

<style lang="scss" scoped>
</style>
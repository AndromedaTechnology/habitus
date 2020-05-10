<template>
  <div class="userHeader">
    <div class="row">
      <div class="column">
        <h1>
          <span>@</span>
          <span>{{ user.username }}</span>
        </h1>
        <button class="btn-dark" @click="deleteUser()">Delete</button>
      </div>
      <div class="column" v-if="habits.length > 2">
        <UserChart :habits="habits" :activities="activities" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../store/user/types";
import { Activities } from "../store/activity/types";
import { Habit } from "../store/habit/types";
import UserChart from "@/components/UserChart.vue";

@Component({
  components: {
    UserChart,
  },
})
export default class UserHeader extends Vue {
  @Prop() private user!: User;
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | undefined;

  deleteUser() {
    this.$emit("delete");
  }
}
</script>

<style scoped lang="scss">
.userHeader {
  text-align: center;
  padding: 64px;

  .row {
    display: block;
    @media only screen and (min-width: 1024px) {
      display: flex;
      .column {
        flex: 50%;
      }
    }
  }
}
</style>

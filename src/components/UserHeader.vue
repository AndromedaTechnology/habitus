<template>
  <div class="userHeader">
    <div class="row">
      <div class="column">
        <h1>
          <span>@</span>
          <span>{{ user.username }}</span>
        </h1>
        <!-- Edit  -->
        <div class="editContainer">
          <v-btn @click="$refs.editModal.open()">Edit</v-btn>
        </div>
      </div>
      <div class="column chart">
        <UserChart :habits="habits" :activities="activities" />
      </div>
    </div>

    <sweet-modal ref="editModal">
      <v-text-field v-model="username" label="Username"></v-text-field>
      <v-text-field v-model="firstName" label="First Name"></v-text-field>
      <v-text-field v-model="lastName" label="Last Name"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-btn @click="deleteUser()" large>Delete</v-btn>
    </sweet-modal>
  </div>
</template>

<script lang="ts">
import { User } from "@/store/user/types";
import { Habit } from "@/store/habit/types";
import { Activities } from "@/store/activity/types";
import UserChart from "@/components/UserChart.vue";

import { SweetModal } from "sweet-modal-vue";
import { State, Action, Getter, Mutation } from "vuex-class";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    UserChart,
    SweetModal,
  },
})
export default class UserHeader extends Vue {
  @Prop() private user!: User;
  @Prop() private habits!: Array<Habit> | undefined;
  @Prop() private activities!: Activities | undefined;
  @Action("updateUser", { namespace: "user" }) updateUser: any;

  username: string | undefined | null = null;
  firstName: string | undefined | null = null;
  lastName: string | undefined | null = null;
  email: string | undefined | null = null;

  mounted() {
    this.username = this.user.username;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  }

  @Watch("username", {
    immediate: false,
    deep: true,
  })
  usernameChanged(value: any, oldValue: any) {
    this.updateUser({ habit: this.user, data: { username: value } });
  }

  @Watch("firstName", {
    immediate: false,
    deep: true,
  })
  firstNameChanged(value: any, oldValue: any) {
    this.updateUser({ habit: this.user, data: { firstName: value } });
  }

  @Watch("lastName", {
    immediate: false,
    deep: true,
  })
  lastNameChanged(value: any, oldValue: any) {
    this.updateUser({ habit: this.user, data: { lastName: value } });
  }

  @Watch("email", {
    immediate: false,
    deep: true,
  })
  emailChanged(value: any, oldValue: any) {
    this.updateUser({ habit: this.user, data: { email: value } });
  }

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

    .column.chart {
      margin-top: 48px;
    }

    @media only screen and (min-width: 1024px) {
      display: flex;
      .column {
        flex: 50%;
      }
      .column.chart {
        margin-top: auto;
      }
    }
  }
}
</style>

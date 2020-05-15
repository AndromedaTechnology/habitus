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
          <button class="btn-dark edit" @click="$refs.editModal.open()">
            Edit
          </button>
        </div>
      </div>
      <div class="column chart" v-if="habits.length > 2">
        <UserChart :habits="habits" :activities="activities" />
      </div>
    </div>

    <sweet-modal ref="editModal">
      <!-- Username -->
      <div class="nameContainer">
        <h3>Username</h3>
        <input type="text" class="input-dark" v-model="username" />
      </div>

      <!-- First Name -->
      <div class="nameContainer">
        <h3>First Name</h3>
        <input type="text" class="input-dark" v-model="firstName" />
      </div>

      <!-- Last Name -->
      <div class="nameContainer">
        <h3>Last Name</h3>
        <input type="text" class="input-dark" v-model="lastName" />
      </div>

      <!-- Email -->
      <div class="nameContainer">
        <h3>Email</h3>
        <input type="text" class="input-dark" v-model="email" />
      </div>

      <!-- Delete -->
      <div class="deleteContainer">
        <h3>Delete</h3>
        <button class="btn-dark" @click="deleteUser()">Delete</button>
      </div>
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

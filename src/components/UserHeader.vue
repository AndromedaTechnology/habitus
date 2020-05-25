<template>
  <v-container class="userHeader">
    <v-row>
      <v-col cols="12" sm="12">
        <!-- Edit  -->
        <v-btn v-if="allowEdit" @click="$refs.editModal.open()">Edit</v-btn>

        <!-- Username -->
        <h1 class="mt-8">
          <span>@</span>
          <span>{{ user.username }}</span>
        </h1>
      </v-col>
    </v-row>

    <sweet-modal ref="editModal">
      <v-text-field v-model="username" label="Username"></v-text-field>
      <v-text-field v-model="firstName" label="First Name"></v-text-field>
      <v-text-field v-model="lastName" label="Last Name"></v-text-field>
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-btn @click="deleteUser()" large>Delete</v-btn>
    </sweet-modal>
  </v-container>
</template>

<script lang="ts">
import { User } from "@/store/user/types";

import { SweetModal } from "sweet-modal-vue";
import { Action } from "vuex-class";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    SweetModal
  }
})
export default class UserHeader extends Vue {
  @Prop() private user!: User;
  @Prop({ default: false, type: Boolean }) allowEdit?: boolean;
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
    deep: true
  })
  usernameChanged(value: any, oldValue: any) {
    this.updateUser({ habit: this.user, data: { username: value } });
  }

  @Watch("firstName", {
    immediate: false,
    deep: true
  })
  firstNameChanged(value: any, oldValue: any) {
    this.updateUser({ habit: this.user, data: { firstName: value } });
  }

  @Watch("lastName", {
    immediate: false,
    deep: true
  })
  lastNameChanged(value: any, oldValue: any) {
    this.updateUser({ habit: this.user, data: { lastName: value } });
  }

  @Watch("email", {
    immediate: false,
    deep: true
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
}
</style>

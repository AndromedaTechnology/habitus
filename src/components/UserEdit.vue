<template>
  <v-card tile>
    <v-toolbar flat dark color="#42b983">
      <v-btn icon dark @click="handleClose()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Your information</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="handleClose()">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Username</v-list-item-title>
            <v-text-field v-model="username" label="Username" solo autocomplete="off"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>First Name</v-list-item-title>
            <v-text-field v-model="firstName" label="First Name" solo autocomplete="off"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Last Name</v-list-item-title>
            <v-text-field v-model="lastName" label="Last Name" solo autocomplete="off"></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Email</v-list-item-title>
            <v-text-field v-model="email" label="Email" solo autocomplete="off"></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn x-large class="ma-2" @click="deleteDialog = !deleteDialog">Delete</v-btn>

            <v-dialog v-model="deleteDialog" max-width="500px">
              <v-card>
                <v-card-title>Delete everything?</v-card-title>
                <v-card-text></v-card-text>
                <v-card-actions>
                  <v-btn color="success" @click="deleteDialog = false">No</v-btn>
                  <v-btn @click="handleDelete()" color="error">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>

    <div style="flex: 1 1 auto;"></div>
  </v-card>
</template>

<script lang="ts">
import { User } from "@/store/user/types";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "UserEdit"
})
export default class UserEdit extends Vue {
  @Prop() private user!: User;

  username: string | undefined | null = null;
  firstName: string | undefined | null = null;
  lastName: string | undefined | null = null;
  email: string | undefined | null = null;

  deleteDialog = false;

  mounted() {
    this.username = this.user.username;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.email = this.user.email;
  }

  handleUpdate(data: {}) {
    this.$emit("update", data);
  }

  handleDelete() {
    this.deleteDialog = false;
    this.$emit("delete");
  }

  handleClose() {
    this.$emit("close");
  }

  @Watch("username", {
    immediate: false,
    deep: true
  })
  usernameChanged(value: any, oldValue: any) {
    this.handleUpdate({ username: value });
  }

  @Watch("firstName", {
    immediate: false,
    deep: true
  })
  firstNameChanged(value: any, oldValue: any) {
    this.handleUpdate({ firstName: value });
  }

  @Watch("lastName", {
    immediate: false,
    deep: true
  })
  lastNameChanged(value: any, oldValue: any) {
    this.handleUpdate({ lastName: value });
  }

  @Watch("email", {
    immediate: false,
    deep: true
  })
  emailChanged(value: any, oldValue: any) {
    this.handleUpdate({ email: value });
  }
}
</script>

<style scoped lang="scss">
</style>

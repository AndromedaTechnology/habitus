<template>
  <v-container class="userHeader">
    <v-row>
      <v-col cols="12" sm="12">
        <!-- Edit -->
        <div v-if="allowEdit">
          <v-btn @click="editDialog = true">Edit</v-btn>
        </div>

        <!-- Username -->
        <h1 class="mt-4">
          <span>@</span>
          <span>{{ user.username }}</span>
        </h1>

        <!-- Health -->
        <v-chip class="mt-4" :color="getHealth() >= 0 ? '#42b983' : '#b94278'">
          <h4>{{ getHealth() >= 0 ? '+' + getHealth() : getHealth() }} HEALTH</h4>
        </v-chip>
      </v-col>
    </v-row>

    <v-dialog
      v-model="editDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <UserEdit
        :user="user"
        @update="handleUpdate($event)"
        @delete="handleDelete()"
        @close="editDialog = false"
      />
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import UserEdit from "@/components/User/UserEdit.vue";

import { User } from "@/store/user/types";

import { Action, Getter } from "vuex-class";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    UserEdit,
  },
})
export default class UserHeader extends Vue {
  @Prop() private user!: User;
  @Prop({ default: false, type: Boolean }) allowEdit?: boolean;

  editDialog = false;

  @Getter("getHealth", { namespace: "activity" })
  getHealth: any;
  @Action("updateUser", { namespace: "user" }) updateUser: any;

  handleUpdate(data: {}) {
    this.updateUser({ user: this.user, data: data });
  }

  handleDelete() {
    this.editDialog = false;
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

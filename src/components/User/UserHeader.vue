<template>
  <v-alert text v-if="user" class="pa-12">
    <v-container class="text-center pa-12">
      <v-row>
        <v-col cols="12" sm="12" class="pa-12">
          <!-- Edit Button -->
          <v-btn
            large
            v-if="allowEdit"
            @click="editDialog = true"
          >
            <v-icon class="pr-4">edit</v-icon>
            <h3>Edit</h3>
          </v-btn>
          <!-- Username -->
          <h1 class="mt-4">
            <span>@</span>
            <span>{{ user.username }}</span>
          </h1>
          <!-- Health -->
          <v-chip class="mt-4" :color="getHealth() >= 0 ? colors.GOOD : colors.BAD">
            <h3>{{ getHealth() >= 0 ? '+' + getHealth() : getHealth() }} HEALTH</h3>
          </v-chip>
        </v-col>
      </v-row>
      <!-- Edit Dialog -->
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
  </v-alert>
</template>
<script lang="ts">
import { COLORS } from "@/helpers/enums";
import { Action, Getter } from "vuex-class";
import UserEdit from "@/components/User/UserEdit.vue";
import { User, UserUpdateDto } from "@/store/user/types";
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  components: {
    UserEdit,
  },
})
export default class UserHeader extends Vue {
  @Prop() private user!: User;
  @Prop({ default: false, type: Boolean }) allowEdit?: boolean;

  @Getter("getHealth", { namespace: "activity" }) getHealth: any;
  @Action("updateUser", { namespace: "user" }) updateUser!: (data: { id: string; data: UserUpdateDto } ) => any;

  editDialog = false;
  colors: any = COLORS;

  handleUpdate(data: UserUpdateDto) {
    this.updateUser({
      id: this.user._id,
      data: data
    });
  }
  handleDelete() {
    this.editDialog = false;
    this.$emit("delete");
  }
}
</script>

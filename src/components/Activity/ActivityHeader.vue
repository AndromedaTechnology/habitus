<template>
  <v-alert text class="pa-0" :color="habit.isGood ? colors.GOOD : colors.BAD">
    <div class="px-8 py-4">
      <!-- Note -->
      <pre class="note" v-if="activity.note">{{ activity.note }}</pre>
      <!-- Amount -->
      <h4 class="my-4">
        <span>{{ activity.amount }} amount</span>
      </h4>
      <!-- Ago -->
      <timeago class="d-block mt-4" :datetime="activity.createdAt" :auto-update="60"></timeago>
    </div>
    <v-toolbar>
      <!-- Habit Emoji and Name  -->
      <router-link
        v-if="showHabit"
        :to="{name: 'habit', params: {id: habit._id}}"
        :class="{'habit': true}"
      >
        <h3>
          <span v-if="habit.emoji">{{ habit.emoji }}</span>
          &nbsp;
          <span>{{ habit.name }}</span>
        </h3>
      </router-link>
      <div class="flex-grow-1"></div>
      <!-- Edit Button -->
      <v-btn @click="editDialog = true" large text>
        <v-icon class="pr-4">edit</v-icon>
        <h3>Edit</h3>
      </v-btn>
    </v-toolbar>
    <!-- Edit Dialog -->
    <ActivityEditDialog
      v-if="editDialog"
      :habit="habit"
      :activity="activity"
      @closed="editDialog = false"
    />
  </v-alert>
</template>
<script lang="ts">
import { Habit } from "@/store/habit/types";
import { COLORS } from '../../helpers/enums';
import { Activity } from "@/store/activity/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import ActivityEditDialog from "@/components/Activity/ActivityEditDialog.vue";
@Component({
  components: {
    ActivityEditDialog,
  },
})
export default class ActivityHeader extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activity!: Activity;
  @Prop({ default: false, type: Boolean }) showHabit?: boolean;
  editDialog = false;
  colors: any = COLORS;
}
</script>
<style scoped lang="scss">
.note {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}
</style>
<style lang="scss" scoped>
a.habit {
  color: inherit;
}
</style>

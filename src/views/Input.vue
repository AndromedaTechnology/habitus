<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2" class="pa-8">
        <v-alert text class="py-8">
          <v-textarea v-model="noteContent" placeholder="Write down your thoughts..." solo></v-textarea>
          <v-btn block x-large @click="handleCreateNote()">
            <v-icon class="pr-4">save</v-icon>
            <h3>Save</h3>
          </v-btn>
        </v-alert>
        <div class="py-8">
          <v-row>
            <v-col v-for="(habit, index) in habits" :key="habit._id" cols="12" :sm="getColumnSize(index, habits.length)">
              <v-alert
                :color="habit.isGood ? colors.GOOD : colors.BAD"
                class="pa-12 cursorPointer"
                @click.native="saveActivity(undefined, habit._id)"
              >
                <div class="text-center">
                  <h2>
                  {{habit.emoji}}
                  {{habit.name}}
                  </h2>
                </div>
              </v-alert>
            </v-col>
          </v-row>
        </div>
        <ActivityEditDialog
          v-if="isDialogVisible"
          :habit="habit"
          :activity="activity"
          :isTemporary="true"
          @closed="hideDialog()"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { COLORS } from "@/helpers/enums";
import { User } from "@/store/user/types";
import Component from "vue-class-component";
import { Action, Getter } from "vuex-class";
import { Habit } from "@/store/habit/types";
import { NoteCreateDto } from "@/store/note/types";
import { Activity, ActivityCreateDto } from "@/store/activity/types";
import ActivityEditDialog from "@/components/Activity/ActivityEditDialog.vue";
@Component({
  name: "Input",
  components: {
    ActivityEditDialog,
  },
})
export default class Input extends Vue {
  @Getter("currentUser", { namespace: "user" }) currentUser: User | undefined;
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("createNote", { namespace: "note" }) createNote!: (data: NoteCreateDto) => any;
  @Action("createActivity", { namespace: "activity" }) createActivity!: (data: ActivityCreateDto) => any;

  habit?: Habit;
  activity?: Activity;
  colors: any = COLORS;
  isDialogVisible = false;
  noteContent: string | null = null;

  async handleCreateNote() {
    if (!this.noteContent) return;
    const note = await this.createNote({
      content: this.noteContent
    });
    this.noteContent = null;
    this.saveActivity(note._id);
  }

  showDialog() {
    this.isDialogVisible = true;
  }
  hideDialog() {
    this.isDialogVisible = false;
    this.habit = undefined;
    this.activity = undefined;
  }

  /**
   * Last item takes whole row (if odd number of items)
   */
  getColumnSize(index: number, total: number) {
    if (index === total - 1) {
      return total % 2 ? 12 : 6;
    }
    return 6;
  }

  saveActivity(noteId?: string, habitId?: string) {
    if (habitId) {
      this.habit = this.habits?.find(item => item._id === habitId);
    } else {
      this.habit = undefined;
    }

    this.createActivity({
      habitId: habitId,
      userId: this.currentUser?._id,
      noteId: noteId,
    }).then((activity: Activity) => {
      this.activity = activity;
      this.showDialog();
      this.playSoundNotification(this.habit ? this.habit.isGood : true);
    });
  }

  playSoundNotification(isGood = true) {
    if (isGood) {
      const audio = new Audio("/audio/notificationGood.ogg");
      audio.play();
    } else {
      const audio = new Audio("/audio/notificationBad.ogg");
      audio.play();
    }
  }
}
</script>
<style lang="scss" scoped>
.cursorPointer {
  cursor: pointer;
}
</style>

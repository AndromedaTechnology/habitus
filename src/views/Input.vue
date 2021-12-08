<template>
  <div>
    <EmotionInput
      class="my-12 py-12"
      :emotions="emotions"
      :isLoading="emotionsIsLoading"
      @selectedId="handleSaveEmotion($event)"
    />
    <v-container>
      <v-row>
        <v-col cols="12" sm="12">
          <v-alert text class="pa-8" elevation="12">
            <div class="mb-4">
              <h1>✍️ What are you thinking about?</h1>
            </div>
            <v-textarea v-model="noteContent" placeholder="What are you thinking about?" solo></v-textarea>
            <v-btn block x-large @click="handleCreateNote()">
              <v-icon class="pr-4">save</v-icon>
              <h3>Save</h3>
            </v-btn>
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-alert text class="pa-8" elevation="12">
            <div class="mb-4">
              <h1>🧘‍♀️ What did you do?</h1>
            </div>
            <v-row v-if="habits && habits.length">
              <v-col v-for="(habit, index) in habits" :key="habit._id" cols="12" :sm="getColumnSize(index, habits.length)">
                <v-alert
                  :color="habit.isGood ? colors.GOOD : colors.BAD"
                  class="pa-12 cursorPointer"
                  @click.native="saveActivity(undefined, undefined, habit._id)"
                >
                  <div class="text-center">
                    <h1>
                    {{habit.emoji}}
                    {{habit.name}}
                    </h1>
                  </div>
                </v-alert>
              </v-col>
            </v-row>
            <v-row v-else-if="habitsIsLoading">
              <v-col v-for="(index) in 12" :key="index" cols="12" :sm="getColumnSize(index, 12)">
                <v-skeleton-loader
                  type="card"
                ></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-alert>
          <ActivityEditDialog
            v-if="isDialogVisible"
            :habit="habit"
            :activity="activity"
            :isTemporary="true"
            @closed="hideDialog()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <Info class="my-12" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { COLORS } from "@/helpers/enums";
import { User } from "@/store/user/types";
import Component from "vue-class-component";
import { Action, Getter } from "vuex-class";
import { Habit } from "@/store/habit/types";
import { Emotion } from "@/store/emotion/types";
import Info from '../components/General/Info.vue';
import { NoteCreateDto } from "@/store/note/types";
import EmotionInput from '../components/Emotion/EmotionInput.vue';
import { Activity, ActivityCreateDto } from "@/store/activity/types";
import ActivityEditDialog from "@/components/Activity/ActivityEditDialog.vue";
@Component({
  name: "Input",
  components: {
    Info,
    EmotionInput,
    ActivityEditDialog,
  },
})
export default class Input extends Vue {
  @Getter("currentUser", { namespace: "user" }) currentUser: User | undefined;
  @Getter("isLoading", { namespace: "emotion" }) emotionsIsLoading: boolean | undefined;
  @Getter("emotions", { namespace: "emotion" }) emotions: Array<Emotion> | undefined;
  @Getter("isLoading", { namespace: "habit" }) habitsIsLoading: boolean | undefined;
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
    this.saveActivity(undefined, note._id);
  }

  handleSaveEmotion(emotionId: string) {
    this.saveActivity(emotionId);
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

  saveActivity(emotionId?: string, noteId?: string, habitId?: string) {
    if (habitId) {
      this.habit = this.habits?.find(item => item._id === habitId);
    } else {
      this.habit = undefined;
    }

    this.createActivity({
      emotionId,
      habitId,
      noteId,
      userId: this.currentUser?._id,
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

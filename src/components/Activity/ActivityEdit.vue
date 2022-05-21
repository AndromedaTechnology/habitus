<template>
  <v-card tile>
    <v-toolbar :color="color">
      <v-btn icon @click="handleClose()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ toolbarName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link
        v-if="habit"
        :to="{name: 'habit', params: {id: habit._id}}"
        :class="{'habit': true}"
      >
        <v-icon>launch</v-icon>
      </router-link>
    </v-toolbar>
    <v-card-text>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Tags</v-list-item-title>
            <TagInput
              :tags="tags"
              :selectedIds="activity.tagIds"
              @selectedIds="setTagIds($event)"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="activity.emotionId && getEmotion(activity.emotionId)">
          <v-list-item-content>
            <v-list-item-title>Feeling</v-list-item-title>
            <EmotionItem
              class="my-4"
              :emotion="getEmotion(activity.emotionId)"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Note</v-list-item-title>
            <v-textarea auto-grow v-model="noteContent" label="Note" solo></v-textarea>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Amount</v-list-item-title>
            <v-text-field v-model="amount" label="Amount" solo></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn class="py-4" @click="deleteDialog = !deleteDialog" x-large>
              <v-icon>delete</v-icon>
              <h3>Delete</h3>
            </v-btn>
            <DeleteDialog
              v-if="deleteDialog"
              name="activity"
              @no="deleteDialog = false"
              @yes="handleDelete()"
            ></DeleteDialog>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    <div style="flex: 1 1 auto;"></div>
  </v-card>
</template>
<script lang="ts">
import { Tag } from "@/store/tag/types";
import { COLORS } from "@/helpers/enums";
import { Note } from "@/store/note/types";
import TagInput from "../Tag/TagInput.vue";
import { Habit } from "@/store/habit/types";
import { Action, Getter } from "vuex-class";
import { Emotion } from "@/store/emotion/types";
import { Activity } from "@/store/activity/types";
import { NoteCreateDto } from "@/store/note/types";
import EmotionItem from '../Emotion/EmotionItem.vue';
import DeleteDialog from '../General/DeleteDialog.vue';
import { ActivityUpdateDto } from "@/store/activity/types";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({
  name: "ActivityEdit",
  components: {
    TagInput,
    EmotionItem,
    DeleteDialog,
  },
})
export default class ActivityEdit extends Vue {
  @Prop() private habit?: Habit;
  @Prop() private activity!: Activity;

  @Getter("tags", { namespace: "tag" }) tags: Array<Tag> | undefined;

  @Getter("getEmotion", { namespace: "emotion" }) getEmotion!: (id: string) => Emotion | undefined;

  @Getter("notes", { namespace: "note" }) notes!: Array<Note> | undefined;
  @Getter("note", { namespace: "note" }) getNote!: (id: string) => Note | undefined;
  @Action("updateNote", { namespace: "note" }) updateNote!: (data: {id: string; data: NoteCreateDto}) => any;
  @Action("createNote", { namespace: "note" }) createNote!: (data: NoteCreateDto) => any;

  @Action("updateActivity", { namespace: "activity" }) updateActivity!: (payload: { id: string; data: ActivityUpdateDto }) => any;
  @Action("deleteHabitActivity", { namespace: "activity" }) deleteHabitActivity!: (payload: { id: string }) => any;

  colors: any = COLORS;
  deleteDialog = false;
  noteContent: string | null = null;
  amount: number | undefined | null = null;

  get color() {
    if (this.habit) {
      return this.habit.isGood ? this.colors.GOOD : this.colors.BAD;
    }
    return undefined;
  }

  get toolbarName() {
    if (this.habit) {
      return `${this.habit.emoji ?? ''} ${this.habit.name}`;
    }
    return "Anything to add?";
  }

  @Watch("activity", {
    deep: true,
    immediate: true,
  })
  activityChanged(newValue: any, oldValue: any) {
    if (!newValue) return;
    this.amount = newValue.amount;
    this.initNoteContent(newValue.noteId);
  }

  @Watch("notes", {
    deep: true,
    immediate: true,
  })
  notesChanged(newValue: any, oldValue: any) {
    this.initNoteContent(this.activity.noteId);
  }

  initNoteContent(noteId: string | undefined) {
    if (noteId && !this.noteContent) {
      const note = this.getNote(noteId);
      this.noteContent = note?.content ?? null;
    }
  }

  @Watch("noteContent", {
    deep: true,
    immediate: false
  })
  async noteContentChanged(value: string, oldValue: any) {
    if (this.activity.noteId) {
      this.updateNote({
        id: this.activity.noteId,
        data: {
          content: value
        }
      });
    } else {
      const note = await this.createNote({
        content: value
      });
      this.handleUpdateActivity({
        noteId: note._id
      });
    }
  }

  setTagIds(ids: Array<string>) {
    this.handleUpdateActivity({
      tagIds: ids
    });
  }

  @Watch("amount")
  amountChanged(value: any, oldValue: any) {
    this.handleUpdateActivity({ amount: value });
  }

  handleUpdateActivity(data: ActivityUpdateDto) {
    this.updateActivity({
      id: this.activity._id,
      data: data,
    });

    this.$emit("updated", data);
  }

  handleDelete() {
    this.deleteDialog = false;
    this.deleteHabitActivity({ id: this.activity._id });
    this.$emit("deleted");
  }

  handleClose() {
    this.$emit("closed");
  }
}
</script>

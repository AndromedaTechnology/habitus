<template>
  <v-alert class="pa-0" :color="color">
    <v-toolbar color="rgba(0,0,0,0.2)">
      <!-- Habit Emoji and Name  -->
      <router-link
        v-if="habit && showHabit"
        :to="{name: 'habit', params: {id: habit._id}}"
        :class="{'habit': true}"
      >
        <h3>
          <span v-if="habit.emoji">{{ habit.emoji }}</span>
          &nbsp;
          <span>{{ habit.name }}</span>
        </h3>
      </router-link>
    </v-toolbar>
    <div class="px-8 py-0">
      <!-- Tag -->
      <v-list-item v-if="tagsSelected && tagsSelected.length">
        <v-list-item-content>
          <div>
            <TagItem
              v-for="tag in tagsSelected"
              :key="tag._id"
              :tag="tag"
              class="mx-2"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <!-- Emotion -->
      <v-list-item v-if="emotion">
        <v-list-item-content>
          <EmotionItem
            :emotion="emotion"
          />
        </v-list-item-content>
      </v-list-item>
      <!-- Note -->
      <v-list-item v-if="note && note.content">
        <v-list-item-content>
          <pre class="note">{{ note.content }}</pre>
        </v-list-item-content>
      </v-list-item>
      <!-- Amount -->
      <v-list-item v-if="activity.amount">
        <v-list-item-content>
          <h4>
            <span>Amount: {{ activity.amount }}</span>
          </h4>
        </v-list-item-content>
      </v-list-item>
    </div>
    <v-toolbar color="rgba(0,0,0,0.2)" class="px-4">
      <!-- Ago -->
      <timeago class="d-block" :datetime="activity.createdAt" :auto-update="60"></timeago>
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
import { Getter } from "vuex-class";
import TagItem from "../Tag/TagItem.vue";
import { Note } from "@/store/note/types";
import { Habit } from "@/store/habit/types";
import { COLORS } from '../../helpers/enums';
import { Emotion } from "@/store/emotion/types";
import { Activity } from "@/store/activity/types";
import EmotionItem from '../Emotion/EmotionItem.vue';
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ActivityEditDialog from "@/components/Activity/ActivityEditDialog.vue";
import { Tag } from "@/store/tag/types";
@Component({
  components: {
    TagItem,
    EmotionItem,
    ActivityEditDialog,
  },
})
export default class ActivityHeader extends Vue {
  @Prop() private habit?: Habit;
  @Prop() private activity!: Activity;
  @Prop({ default: false, type: Boolean }) showHabit?: boolean;

  @Getter("notes", { namespace: "note" }) notes!: Array<Note> | undefined;
  @Getter("note", { namespace: "note" }) getNote!: (id: string) => Note | undefined;

  @Getter("getEmotion", { namespace: "emotion" }) getEmotion!: (id: string) => Emotion | undefined;

  @Getter("tags", { namespace: "tag" }) tags: Array<Tag> | undefined;

  editDialog = false;
  colors: any = COLORS;
  note: Note | null = null;

  get tagsSelected(): Array<Tag> {
    const ids = this.activity.tagIds;
    const tags = [];
    if (!ids) return [];
    for (const id of ids) {
      const tag = this.tags?.find(item => item._id === id);
      if (tag) {
        tags.push(tag);
      }
    }
    return tags;
  }

  get emotion() {
    return this.activity.emotionId && this.getEmotion(this.activity.emotionId);
  }

  get color() {
    if (this.habit) {
      return this.habit.isGood ? this.colors.GOOD : this.colors.BAD;
    }
    if (this.emotion) {
      return 'primary';
    }
    return undefined;
  }

  @Watch("notes", {
    deep: true,
    immediate: true,
  })
  notesChanged(newValue: any, oldValue: any) {
    this.note = this.activity.noteId ? (this.getNote(this.activity.noteId) ?? null) : null;
  }
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

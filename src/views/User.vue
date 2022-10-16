<template>
  <div>
    <UserHeader
      :user="currentUser"
      :allowEdit="true"
      @delete="userDeleteSubmit()"
    />
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="8" offset-lg="2">
          <SelectDate
            :initialDate="activityListDateStart"
            @save="userSetActivityListDate(new Date($event))"
          />
          <TagInput :tags="tags" @selectedIds="setSelectedTagIds($event)" />
          <Stats
            v-if="activities && activities.length"
            :habits="habits"
            :dateStart="activityListDateStart"
            :dateEnd="activityListDateEnd"
            :activities="activities"
          />
          <ActivityList
            :activities="activities"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Tag } from "@/store/tag/types";
import { Habit } from "@/store/habit/types";
import { Action, Getter } from "vuex-class";
import Component from "vue-class-component";
import Stats from "@/components/User/Stats.vue";
import { Activity } from "@/store/activity/types";
import TagInput from "../components/Tag/TagInput.vue";
import { User as UserType } from "@/store/user/types";
import UserHeader from "@/components/User/UserHeader.vue";
import SelectDate from "@/components/General/SelectDate.vue";
import ActivityList from "@/components/Activity/ActivityList.vue";
@Component({
  name: "User",
  components: {
    Stats,
    TagInput,
    UserHeader,
    SelectDate,
    ActivityList,
  },
})
export default class User extends Vue {
  // User
  @Getter("currentUser", { namespace: "user" }) currentUser: UserType | undefined;
  @Action("deleteUser", { namespace: "user" }) deleteUser!: (id: string) => any;
  @Action("setCurrentUserId", { namespace: "user" }) setCurrentUserId!: (id: string | undefined) => any;

  // Habits
  @Getter("habits", { namespace: "habit" }) habits: Array<Habit> | undefined;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("deleteHabits", { namespace: "habit" }) deleteHabits: any;

  @Getter("tags", { namespace: "tag" }) tags: Array<Tag> | undefined;

  // Activities
  @Getter("getActivities", { namespace: "activity" })
  getActivities!: (
    habitId: string | undefined,
    isDescending?: boolean,
    tagIds?: Array<string>,
    dateStart?: Date,
    dateEnd?: Date
  ) => Array<Activity> | undefined;
  @Action("deleteActivities", { namespace: "activity" }) deleteActivities: any;

  tagIds: Array<string> = [];
  activityListDateStart: Date | null = null;
  activityListDateEnd: Date | null = null;

  mounted() {
    this.setActivityListDate(new Date());
  }


  setSelectedTagIds(ids: Array<string>) {
    this.tagIds = ids;
  }

  get activities() {
    return this.getActivities(
      undefined,
      true,
      this.tagIds ?? undefined,
      this.activityListDateStart ?? undefined,
      this.activityListDateEnd ?? undefined
    );
  }

  userSetActivityListDate(start: Date) {
    this.setActivityListDate(start);
    // Save Google Analytics Event
    this.$ga.event({
      eventCategory: "user.filter.date",
      eventAction: "set",
    });
  }

  setActivityListDate(start: Date) {
    this.activityListDateStart = new Date(start);
    this.activityListDateStart.setHours(0, 0, 0, 0);

    this.activityListDateEnd = new Date(start);
    this.activityListDateEnd.setHours(23, 59, 59, 999);
  }

  userDeleteSubmit() {
    this.deleteUser(this.currentUser!._id);
    this.setCurrentUserId(undefined);

    this.deleteHabits();
    this.fetchHabits();
    this.deleteActivities();
  }
}
</script>

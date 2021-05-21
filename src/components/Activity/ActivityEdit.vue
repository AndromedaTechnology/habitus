<template>
  <v-card tile v-if="habit">
    <v-toolbar :color="habit.isGood ? colors.GOOD : colors.BAD">
      <v-btn icon @click="handleClose()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Anything to add?</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Note</v-list-item-title>
            <v-textarea auto-grow v-model="note" label="Note" solo></v-textarea>
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
import { Action } from "vuex-class";
import { COLORS } from "@/helpers/enums";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import DeleteDialog from '../General/DeleteDialog.vue';
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({
  name: "ActivityEdit",
  components: {
    DeleteDialog,
  },
})
export default class ActivityEdit extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activity!: Activity;

  colors: any = COLORS;

  deleteDialog = false;
  note: string | undefined | null = null;
  amount: number | undefined | null = null;

  @Action("updateActivity", { namespace: "activity" }) updateActivity: any;
  @Action("deleteHabitActivity", { namespace: "activity" })
  deleteHabitActivity: any;

  @Watch("activity", {
    immediate: true,
    deep: true,
  })
  activityChanged(newValue: any, oldValue: any) {
    if (!newValue) return;
    this.amount = newValue?.amount;
    this.note = newValue?.note;
  }

  @Watch("note")
  noteChanged(value: any, oldValue: any) {
    this.handleUpdate({ note: value });
  }

  @Watch("amount")
  amountChanged(value: any, oldValue: any) {
    this.handleUpdate({ amount: value });
  }

  handleUpdate(data: {}) {
    this.updateActivity({
      habit: this.habit,
      activity: this.activity,
      data: data,
    });

    this.$emit("updated", data);
  }

  handleDelete() {
    this.deleteDialog = false;
    this.deleteHabitActivity({ habit: this.habit, activity: this.activity });
    this.$emit("deleted");
  }

  handleClose() {
    this.$emit("closed");
  }
}
</script>

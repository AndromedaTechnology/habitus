<template>
  <v-card tile>
    <v-toolbar :color="habit.isGood ? '#42b983' : '#b94278'">
      <v-btn icon @click="handleClose()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Anything to add?</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="handleClose()">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Note</v-list-item-title>
            <v-textarea light auto-grow v-model="note" label="Note" solo></v-textarea>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Amount</v-list-item-title>
            <v-text-field light v-model="amount" label="Amount" solo></v-text-field>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn x-large class="ma-2" @click="deleteDialog = !deleteDialog">Delete</v-btn>

            <v-dialog v-model="deleteDialog" max-width="500px">
              <v-card>
                <v-card-title>Delete?</v-card-title>
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
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";

import { Action } from "vuex-class";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({
  name: "ActivityEdit",
  components: {},
})
export default class ActivityEdit extends Vue {
  @Prop() private habit!: Habit;
  @Prop() private activity!: Activity;

  amount: number | undefined | null = null;
  note: string | undefined | null = null;
  deleteDialog = false;

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

  @Watch("amount")
  amountChanged(value: any, oldValue: any) {
    this.handleUpdate({ amount: value });
  }

  @Watch("note")
  noteChanged(value: any, oldValue: any) {
    this.handleUpdate({ note: value });
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
    this.deleteHabitActivity({ habit: this.habit, activity: this.activity });
    this.$emit("deleted");
  }

  handleClose() {
    this.$emit("closed");
  }
}
</script>

<style lang="scss" scoped></style>

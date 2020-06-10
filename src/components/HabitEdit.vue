<template>
  <v-card tile>
    <v-toolbar :color="isGood ? '#42b983' : '#b94278'">
      <v-btn icon @click="handleClose()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ this.name }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text @click="handleClose()">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      <v-list three-line>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-text-field v-model="name" label="Name" solo></v-text-field>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Is it good for you</v-list-item-title>
            <v-switch
              class="ma-4"
              large
              inset
              v-model="isGood"
              :label="isGood ? 'Good' : 'Bad'"
              :color="isGood ? '#42b983' : '#b94278'"
            ></v-switch>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>How to track progress</v-list-item-title>
            <v-select
              v-model="amountType"
              :items="[
                { text: 'Points', value: 'amount' },
                { text: 'Time', value: 'timer' },
              ]"
              solo
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Start at</v-list-item-title>
            <datetime
              class="startsAtDate"
              v-model="startsAtDate"
              type="datetime"
              title="Start at"
            ></datetime>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>End at</v-list-item-title>
            <datetime
              class="endsAtDate"
              v-model="endsAtDate"
              type="datetime"
              title="Ends at"
            ></datetime>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn x-large class="ma-2" @click="deleteDialog = !deleteDialog"
              >Delete</v-btn
            >

            <v-dialog v-model="deleteDialog" max-width="500px">
              <v-card>
                <v-card-title>Delete Habit?</v-card-title>
                <v-card-text></v-card-text>
                <v-card-actions>
                  <v-btn color="success" @click="deleteDialog = false"
                    >No</v-btn
                  >
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

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";

import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({
  name: "HabitEdit",
  components: {
    Datetime,
  },
})
export default class HabitEdit extends Vue {
  @Prop() private habit!: Habit;

  name: string | undefined | null = null;
  isGood: boolean | undefined | null = null;
  amountType: string | undefined | null = null;
  startsAtDate: Date | undefined | null = null;
  endsAtDate: Date | undefined | null = null;

  deleteDialog = false;

  mounted() {
    this.name = this.habit?.name;
    this.isGood = this.habit?.isGood;
    this.amountType = this.habit?.amountType;
    this.startsAtDate = this.habit?.startsAtDate;
    this.endsAtDate = this.habit?.endsAtDate;
  }

  handleUpdate(data: {}) {
    this.$emit("update", data);
  }

  handleDelete() {
    this.$emit("delete");
  }
  handleClose() {
    this.$emit("close");
  }

  @Watch("name")
  nameChanged(value: any, oldValue: any) {
    this.handleUpdate({ name: value });
  }

  @Watch("isGood")
  isGoodChanged(value: any, oldValue: any) {
    this.handleUpdate({ isGood: value });
  }

  @Watch("startsAtDate")
  startsAtDateChanged(value: any, oldValue: any) {
    this.handleUpdate({ startsAtDate: value });
  }

  @Watch("endsAtDate")
  endsAtDateChanged(value: any, oldValue: any) {
    this.handleUpdate({ endsAtDate: value });
  }

  @Watch("amountType")
  typeChanged(value: any, oldValue: any) {
    this.handleUpdate({ amountType: value });
  }
}
</script>

<style lang="scss" scoped></style>

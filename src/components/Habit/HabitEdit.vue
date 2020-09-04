<template>
  <v-card tile>
    <v-toolbar :color="isGood ? '#42b983' : '#b94278'">
      <v-btn icon @click="handleClose()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>
        <span v-if="emoji">{{ emoji }}</span>
        &nbsp;
        <span v-if="name">{{ name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-list two-line>
        <v-list-item>
          <v-list-item-content>
            <HabitNameEmojiInput
              :name="name"
              :emoji="emoji"
              @set:name="name = $event"
              @set:emoji="emoji = $event"
              @submit="
                ($event) => {
                  name = $event.name;
                  emoji = $event.emoji;
                }
              "
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-select
              v-model="amountType"
              hint="Tracking"
              persistent-hint
              :items="[
                { text: 'Amount', value: 'amount' },
                { text: 'Time', value: 'timer' },
              ]"
              solo
            ></v-select>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-switch
              class="ma-6"
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
            <v-list-item-title>
              <h2 class="text-center">Impact</h2>
            </v-list-item-title>
            <Impact
              :impact="impact"
              @update="impact = $event"
              class="px-10 mt-12 pt-12"
            />
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="false">
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
        <v-list-item v-if="false">
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
import Impact from "../General/Impact.vue";
import HabitNameEmojiInput from "./HabitNameEmojiInput.vue";

import { Habit } from "@/store/habit/types";

import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component({
  name: "HabitEdit",
  components: {
    Datetime,
    Impact,
    HabitNameEmojiInput,
  },
})
export default class HabitEdit extends Vue {
  @Prop() private habit!: Habit;

  name: string | undefined | null = null;
  emoji: string | null = null;
  isGood: boolean | undefined | null = null;
  amountType: string | undefined | null = null;
  impact: number | undefined | null = null;
  startsAtDate: Date | undefined | null = null;
  endsAtDate: Date | undefined | null = null;

  deleteDialog = false;

  handleUpdate(data: {}) {
    this.$emit("update", data);
  }

  handleDelete() {
    this.$emit("delete");
  }
  handleClose() {
    this.$emit("close");
  }

  @Watch("habit", { deep: true, immediate: true })
  habitChanged(value: any, oldValue: any) {
    this.name = value ? value.name : null;
    this.emoji = value ? value.emoji : null;
    this.isGood = value ? value.isGood : null;
    this.amountType = value ? value.amountType : null;
    this.impact = value ? value.impact : null;
    this.startsAtDate = value ? value.startsAtDate : null;
    this.endsAtDate = value ? value.endsAtDate : null;
  }

  @Watch("name")
  nameChanged(value: any, oldValue: any) {
    this.handleUpdate({ name: value });
  }

  @Watch("emoji")
  emojiChanged(value: any, oldValue: any) {
    this.handleUpdate({ emoji: value });
  }

  @Watch("isGood")
  isGoodChanged(value: any, oldValue: any) {
    this.handleUpdate({ isGood: value });
  }

  @Watch("impact")
  impactChanged(value: any, oldValue: any) {
    this.handleUpdate({ impact: value });
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

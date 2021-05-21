<template>
  <v-bottom-sheet
    scrollable
    persistent
    hide-overlay
    :value="true"
    transition="dialog-bottom-transition"
  >
    <v-sheet>
      <v-progress-linear
        v-if="progressValue"
        color="light-green darken-4"
        height="20"
        stream
        :value="progressValue"
      ></v-progress-linear>
      <ActivityEdit
        :habit="habit"
        :activity="activity"
        @updated="handleUpdated(activity, $event)"
        @deleted="closeDialog()"
        @closed="closeDialog()"
      />
    </v-sheet>
  </v-bottom-sheet>
</template>
<script lang="ts">
/**
 * TODO: Simplify.
 */
import _ from "lodash";
import { Habit } from "@/store/habit/types";
import { Activity } from "@/store/activity/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import ActivityEdit from "@/components/Activity/ActivityEdit.vue";
@Component({
  name: "ActivityEditDialog",
  components: {
    ActivityEdit,
  },
})
export default class ActivityEditDialog extends Vue {
  @Prop({ type: Object, required: true, default: undefined }) habit!: Habit;
  @Prop({ type: Object, required: true, default: undefined }) activity!: Activity;
  @Prop({ type: Boolean, required: false, default: false }) isTemporary!: boolean;

  totalSeconds = 5;
  intervalId: any = null;

  ticksPassed = 0;
  ticksPerSecond = 10;

  get totalTicks() {
    return this.totalSeconds * this.ticksPerSecond;
  }
  get progressValue(): number | null {
    if (this.intervalId) {
      return 100 - ((this.ticksPassed / this.totalTicks) * 100);
    }
    return null;
  }

  mounted() {
    if (this.isTemporary) {
      this.startInterval();
    }
  }

  /**
   * Interval
   * Update remaining time before closing
   */
  startInterval() {
    this.intervalId = setInterval(
      this.handleIntervalTick,
      1000 / this.ticksPerSecond
    );
  }
  handleIntervalTick() {
    this.ticksPassed++;
    if (this.isIntervalDone()) {
      this.emitClosed();
    }
  }
  isIntervalDone() {
    const secondsPassed = this.ticksPassed / this.ticksPerSecond;
    return secondsPassed === this.totalSeconds;
  }
  stopInterval() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  /**
   * Stop Interval on Update
   */
  handleUpdated(activity: Activity, data: {}) {
    this.stopInterval();
  }

  closeDialog() {
    this.emitClosed();
  }
  emitClosed() {
    this.$emit("closed");
  }
}
</script>

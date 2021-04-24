<template>
  <v-bottom-sheet
    scrollable
    hide-overlay
    v-model="dialog"
    transition="dialog-bottom-transition"
  >
    <ActivityEdit
      :habit="habit"
      :activity="activity"
      @updated="handleUpdated(activity, $event)"
      @deleted="closeDialog()"
      @closed="closeDialog()"
    />
  </v-bottom-sheet>
</template>
<script lang="ts">
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

  dialog = false;
  dialogTimer?: number;
  dialogTimeout = 3000; // ms

  mounted() {
    this.showDialog();
  }

  showDialog() {
    this.dialog = true;
    this.dialogTimer = setTimeout(() => {
      this.closeDialog();
    }, this.dialogTimeout);
  }

  closeDialog() {
    this.dialog = false;
    clearTimeout(this.dialogTimer);
    this.emitClosed();
  }

  /**
   * Adding more data, cancel timeout on dialog
   */
  handleUpdated(activity: Activity, data: {}) {
    clearTimeout(this.dialogTimer);
  }

  emitClosed() {
    this.$emit("closed");
  }
}
</script>

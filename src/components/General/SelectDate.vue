<template>
  <div>
    <v-menu
      v-model="isMenuVisible"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Select the date"
          prepend-inner-icon="mdi-calendar"
          readonly
          solo
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        landscape
        @input="save"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
@Component({
  name: "SelectDate",
  components: {
  },
})
export default class SelectDate extends Vue {
  @Prop({ type: Date, default: undefined, required: false}) initialDate?: Date;

  date: string | null = null;
  isMenuVisible = false;

  @Watch("initialDate", {
    deep: true,
    immediate: true,
  })
  initialDateChanged(newValue: any, oldValue: any) {
    if (!newValue) return;
    const offset = newValue.getTimezoneOffset();
    newValue = new Date(newValue.getTime() - (offset*60*1000));
    this.date = newValue.toISOString().split('T')[0];
  }

  save() {
    this.isMenuVisible = false;
    this.$emit("save", this.date);
  }
}
</script>

<template>
  <div>
    <v-text-field
      v-model="nameNew"
      hint="Name"
      persistent-hint
      solo
      autocomplete="off"
      @keyup.enter="submit()"
    >
      <template v-slot:prepend>
        <v-dialog
          v-model="emojiDialog"
          fullscreen
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-if="emojiNew">{{ emojiNew }}</v-icon>
            <v-icon v-on="on" v-else>insert_emoticon</v-icon>
          </template>
          <template v-slot:default>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="emojiDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Emoji</v-toolbar-title>
              </v-toolbar>
              <div class="text-center ma-12">
                <VEmojiPicker @select="emojiSelected" />
              </div>
            </v-card>
          </template>
        </v-dialog>
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import VEmojiPicker from "v-emoji-picker";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({ name: "HabitNameEmojiInput", components: { VEmojiPicker } })
export default class HabitNameEmojiInput extends Vue {
  @Prop({ default: null, type: String }) name?: string | null;
  @Prop({ default: null, type: String }) emoji?: string | null;

  nameNew: string | null = null;
  emojiNew: string | null = null;
  emojiDialog = false;

  @Watch("name", {
    immediate: true,
  })
  nameChanged(newValue: any, oldValue: any) {
    this.nameNew = newValue;
  }

  @Watch("emoji", {
    immediate: true,
  })
  emojiChanged(newValue: any, oldValue: any) {
    this.emojiNew = newValue;
  }

  @Watch("nameNew", {
    immediate: true,
  })
  nameNewChanged(newValue: any, oldValue: any) {
    this.$emit("set:name", newValue);
  }

  @Watch("emojiNew", {
    immediate: true,
  })
  emojiNewChanged(newValue: any, oldValue: any) {
    this.$emit("set:emoji", newValue);
  }

  emojiSelected(emoji: any) {
    this.emojiNew = emoji.data;
    this.emojiDialog = false;
  }

  submit() {
    this.$emit("submit", { name: this.nameNew, emoji: this.emojiNew });
  }
}
</script>

<style scoped lang="scss"></style>

<template>
  <v-chip :key="tag._id" class="px-4">
    <h3>
      <v-avatar
        left
        class="accent white--text mr-3"
        v-text="avatarText"
      ></v-avatar>
      <span>
       # {{ tag.name }}
      </span>
    </h3>
  </v-chip>
</template>
<script lang="ts">
import Vue from "vue";
import { Tag } from "@/store/tag/types";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component({
  name: "TagItem",
})
export default class TagItem extends Vue {
  @Prop({ type: Object, required: true, default: undefined }) tag!: Tag;

  get avatarText() {
    return this.tag.name?.slice(0, 1);
  }
}
</script>

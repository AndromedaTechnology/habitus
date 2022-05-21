<template>
  <v-chip :key="tag._id" large class="px-8">
    <h2>
      <v-avatar
        left
        large
        class="accent white--text mr-3"
        v-text="tag.name"
      ></v-avatar>
      <span>
       # {{ tag.name }}
      </span>
    </h2>
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
}
</script>

<template>
  <div>
    <v-combobox
      v-model="tagsSelected"
      return-object
      item-text="name"
      :items="tags"
      label="Tags"
      multiple
      chips
      solo
    >
      <template v-slot:selection="data">
        <v-chip
          class="px-6"
          large
          :key="JSON.stringify(data.item)"
          v-bind="data.attrs"
          :input-value="data.selected"
          :disabled="data.disabled"
          @click:close="data.parent.selectItem(data.item)"
        >
          <v-avatar
            left
            large
            class="accent white--text mr-3"
            v-text="getAvatarText(data.item)"
          ></v-avatar>
          <h3>{{ data.item.name }}</h3>
        </v-chip>
      </template>
    </v-combobox>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Tag } from "@/store/tag/types";
import { Action } from "vuex-class";
@Component({
  name: "TagInput",
  components: {}
})
export default class TagInput extends Vue {
  @Prop({ type: Array, required: true, default: undefined }) tags?: Array<Tag>;
  @Prop({ type: Array, required: false, default: undefined }) selectedIds?: Array<string>;

  @Action("persistTag", { namespace: "tag" }) persistTag: any;

  mounted() {
    if (this.selectedIds) {
      this.setTagsSelected(this.selectedIds);
    }
  }

  getAvatarText(item: Tag | string) {
    const name = typeof item === 'string' ? item : item.name;
    return name?.slice(0, 1);
  }

  setTagsSelected(selectedIds: Array<string>) {
    for (const id of selectedIds) {
      const tag = this.tags?.find(item => {
        return item._id === id;
      });
      if (tag) {
        this.tagsSelected.push(tag);
      }
    }
  }

  tagsSelected: Array<Tag | string> = [];

  @Watch("tagsSelected", {
    immediate: false,
    deep: true,
  })
  tagsSelectedChanged(value: Array<Tag | string>, oldValue: Array<Tag | string>) {
    if (!value) return;
    this.createAndReplaceTags();
    this.emitSelectedIds();
  }

  /**
   * TODO: Evade continual watcher triggering
   */
  async createAndReplaceTags() {
    for (let index = 0; index < this.tagsSelected.length; index++) {
      const element = this.tagsSelected[index];
      if (typeof element === 'string') {
        const tag = await this.createTag(element);
        if (tag) {
          this.$set(this.tagsSelected, index, tag);
        }
      }
    }
  }

  async createTag(name: string): Promise<Tag> {
    const tag = await this.persistTag({
      name: name,
    });
    // Save Google Analytics Event
    this.$ga.event({
      eventCategory: "tagCreate",
      eventAction: "create",
    });
    return tag;
  }

  emitSelectedIds() {
    const ids: Array<string> = [];
    this.tagsSelected.forEach((tag: Tag | string) => {
      if (typeof tag !== 'string') {
        if (tag._id) {
          ids.push(tag._id);
        }
      }
     });
    this.$emit("selectedIds", ids);
  }
}
</script>
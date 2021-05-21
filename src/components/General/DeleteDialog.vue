<template>
  <v-dialog v-model="isVisible" max-width="500px" persistent>
    <v-card>
      <v-card-title>
        <h2>
          Delete {{name}}?
        </h2>
      </v-card-title>
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn @click="handleNo()" color="success" block>
                <h3>
                  No
                </h3>
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn @click="handleYes()" color="error" block>
                <h3>
                  Yes
                </h3>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "DeleteDialog",
})
export default class DeleteDialog extends Vue {
  @Prop({ type: String, default: undefined, required: false}) private name?: string;

  isVisible = true;

  handleNo() {
    this.isVisible = false;
    this.$emit("no");
  }
  handleYes() {
    this.isVisible = false;
    this.$emit("yes");
  }
}
</script>

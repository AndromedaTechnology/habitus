<template>
  <div>
    <v-tooltip bottom color="success" content-class="custom-tooltip">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on" x-large>mdi-incognito</v-icon>
      </template>
      <v-sheet class="ma-0 pa-8 text-center" color="success">
        <h2><v-icon>mdi-check-outline</v-icon> Activated</h2>
        <h2>Anonymous mode</h2>
        <h3 class="mt-4">Data is stored in your browser, and not sent anywhere else.</h3>
      </v-sheet>
    </v-tooltip>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "AnonymousMode",
})
export default class AnonymousMode extends Vue {}
</script>

<style lang="scss" scoped>
.custom-tooltip {
    opacity: 1!important;
}
</style>
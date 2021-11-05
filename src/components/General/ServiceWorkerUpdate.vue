<template>
  <div>
    <v-snackbar :value="updateExists" left bottom :timeout="0" color="primary">
      <h3>
        An update is available.
        <v-btn @click="refreshApp" class="ml-4">
          <v-icon>refresh</v-icon>
          Update
        </v-btn>
      </h3>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import SWMixin from '@/mixins/sw.mixin';
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
@Component({
  name: "ServiceWorkerUpdate",
  mixins: [SWMixin],
})
export default class ServiceWorkerUpdate extends mixins(SWMixin) {
  //
}
</script>

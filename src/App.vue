<template>
  <v-app>
    <v-app-bar app dark color="#121212" height="96">
      <!-- Logo -->
      <div class="d-flex align-center">
        <router-link :to="{ name: 'home' }">
          <v-img
            alt="Habitus Logo"
            class="shrink mr-2 mt-4"
            contain
            src="/img/icons/logo.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>

      <Add />
    </v-app-bar>

    <router-view class="routerView" />
  </v-app>
</template>
<script lang="ts">
import { Action } from "vuex-class";
import Add from "@/components/Add.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "App",
  components: {
    Add
  }
})
export default class App extends Vue {
  @Action("fetchNotes", { namespace: "note" }) fetchNotes: any;
  mounted() {
    this.fetchNotes();
  }
}
</script>
<style lang="scss" scoped>
.routerView {
  margin-top: 96px;
}
</style>

<style lang="scss">
$backgroundColor: #121212;
$textColor: #fff;
$badgeBackgroundColor: #1f1f1f;

body {
  background: $backgroundColor;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $textColor;
}

a {
  color: $textColor;
  text-decoration: none;
}

.time-picker {
  input,
  .dropdown {
    background: $backgroundColor;
    color: $textColor;
  }
}

button {
  cursor: pointer;
  text-transform: uppercase;
}

.sweet-modal-overlay,
.sweet-modal {
  background: $backgroundColor !important;

  .sweet-box-actions .sweet-action-close {
    background: #039be5;
    color: #fff !important;
  }
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>

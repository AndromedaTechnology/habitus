<template>
  <v-app>
    <v-app-bar app dark color="#121212" height="96">
      <!-- Logo -->
      <div class="d-flex align-center">
        <router-link :to="{ name: 'home' }">
          <v-img
            alt="Habitus Logo"
            class="shrink mr-2"
            contain
            src="/img/icons/logo.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <!-- Stats -->
      <v-btn :to="{ name: 'stats' }" text active-class="no-active">
        <v-icon large>bar_chart</v-icon>
      </v-btn>

      <!-- Add -->
      <v-btn :to="{ name: 'add-habit' }" text active-class="no-active">
        <v-icon large>add_box</v-icon>
      </v-btn>
    </v-app-bar>

    <router-view class="routerView" />
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App",
  components: {}
})
export default class App extends Vue {}
</script>
<style lang="scss" scoped>
.routerView {
  margin-top: 64px;
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
  @media (min-width: 768px) {
    margin: 64px;
  }
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

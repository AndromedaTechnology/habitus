<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home' }">
        <h2>Habitus</h2>
      </router-link>
      <router-link :to="{ name: 'add-habit' }">
        <h2>Add Habit</h2>
      </router-link>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "App",
  components: {}
})
export default class App extends Vue {}
</script>
<style lang="scss">
$backgroundColor: #000;
$textColor: #fff;
$activeLinkColor: #42b983;
$activeLinkBadColor: #b94278;
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
  text-decoration: none;
}

#nav {
  padding: 30px;
  text-align: center;
  a {
    h2 {
      display: inline;
    }
    &:not(:last-of-type) {
      margin-right: 32px;
    }
  }
}

a {
  font-weight: bold;
  color: $textColor;
  &.router-link-exact-active {
    color: $activeLinkColor;
    &.isBad {
      color: $activeLinkBadColor;
    }
  }
}

.time-picker {
  input,
  .dropdown {
    background: $backgroundColor;
    color: $textColor;
  }
}

select,
:not(.time-picker) > input,
button {
  background: $badgeBackgroundColor;
  border: solid 2px $badgeBackgroundColor;
  color: #fff;

  outline: none;

  border-radius: 0px;
  text-decoration: none;
  padding: 0px 24px;
  font-size: 16px;
  line-height: 32px;
  font-weight: 400;
  letter-spacing: 3px;
  -webkit-transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -ms-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

button {
  cursor: pointer;
  text-transform: uppercase;
}

button:hover,
button.active {
  color: $textColor;
  border: solid 2px $textColor;

  background: transparent;
}

.badge {
  vertical-align: middle;
  box-sizing: border-box;
  display: inline-block;
  background-color: $badgeBackgroundColor;
  color: $textColor;
  border-radius: 3rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  padding: 8px 16px;
  line-height: inherit;
}

.sweet-modal-overlay,
.sweet-modal {
  background: $backgroundColor !important;
}
</style>

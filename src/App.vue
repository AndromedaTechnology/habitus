<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Habitus</router-link>
      <router-link to="/add-habit">Add Habit</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;
    &:not(:last-of-type) {
      margin-right: 8px;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

input,
button {
  border: solid 2px #1f1f1f;
  background: transparent;
  color: #1f1f1f;

  outline: none;

  border-radius: 0px;
  text-decoration: none;
  padding: 0px 18px;
  font-size: 12px;
  line-height: 19px;
  text-transform: uppercase;
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
}

button:hover,
button.active {
  border: solid 2px #1f1f1f;
  background: #1f1f1f;
  color: #fff;
}
</style>

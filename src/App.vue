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
        <router-link v-if="user" :to="{ name: 'user' }" class="mt-4 mx-4">
          <v-icon x-large>person_outline</v-icon>
        </router-link>
      </div>
      <Add />
    </v-app-bar>
    <router-view v-if="user" class="routerView" />
    <v-container v-else>
      <v-row>
        <v-col cols="12" class="mt-12 pt-12">
          <div class="mt-12 pt-12">
            <Welcome
              v-if="!isWelcomeDone"
              @done="isWelcomeDone = true"
            />
            <v-slide-y-transition>
              <UserCreate
                v-show="isWelcomeDone"
                @submit="userCreateSubmit($event)"
              />
            </v-slide-y-transition>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script lang="ts">
import Add from "@/components/Add.vue";
import { User } from "./store/user/types";
import { Action, Getter } from "vuex-class";
import Welcome from '@/components/General/Welcome.vue';
import { Component, Vue } from "vue-property-decorator";
import UserCreate from "@/components/User/UserCreate.vue";
@Component({
  name: "App",
  components: {
    Add,
    Welcome,
    UserCreate,
  }
})
export default class App extends Vue {
  @Getter("user", { namespace: "user" }) user: User | undefined;
  @Action("fetchUser", { namespace: "user" }) fetchUser: any;
  @Action("fetchNotes", { namespace: "note" }) fetchNotes: any;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("persistUser", { namespace: "user" }) persistUser: any;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;

  isWelcomeDone = false;

  mounted() {
    this.fetchUser();
    this.fetchNotes();
    this.fetchHabits();
    this.fetchActivities();
  }

  userCreateSubmit(username: string) {
    this.persistUser({
      username: username,
    });
    this.fetchUser();
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

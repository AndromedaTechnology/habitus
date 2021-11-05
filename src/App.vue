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
        <router-link v-if="currentUser" :to="{ name: 'user' }" class="mt-4 mx-4">
          <v-icon x-large>face</v-icon>
        </router-link>
      </div>
      <Add />
    </v-app-bar>
    <router-view v-if="currentUser" class="routerView" />
    <v-container v-else>
      <v-row>
        <v-col cols="12" class="mt-12 pt-12">
            Preparing everything for you...
        </v-col>
      </v-row>
    </v-container>
    <ServiceWorkerUpdate />
  </v-app>
</template>
<script lang="ts">
import Add from "@/components/Add.vue";
import { Action, Getter} from "vuex-class";
import { Component, Vue, Watch } from "vue-property-decorator";
import ServiceWorkerUpdate from "./components/General/ServiceWorkerUpdate.vue";
import { CURRENT_USER_INITIAL_USERNAME, User, UserCreateDto } from "./store/user/types";
@Component({
  name: "App",
  components: {
    Add,
    ServiceWorkerUpdate,
  },
})
export default class App extends Vue {
  @Action("fetchUsers", { namespace: "user" }) fetchUsers: any;
  @Getter("currentUser", { namespace: "user" }) currentUser: User | undefined;
  @Getter("currentUserId", { namespace: "user" }) currentUserId: string | undefined;
  @Action("fetchCurrentUserId", { namespace: "user" }) fetchCurrentUserId: any;
  @Action("createUser", { namespace: "user" }) createUser!: (data: UserCreateDto) => any;
  @Action("setCurrentUserId", { namespace: "user" }) setCurrentUserId!: (id: string) => any;

  @Action("fetchEmotions", { namespace: "emotion" }) fetchEmotions: any;
  @Action("fetchNotes", { namespace: "note" }) fetchNotes: any;
  @Action("fetchHabits", { namespace: "habit" }) fetchHabits: any;
  @Action("fetchActivities", { namespace: "activity" }) fetchActivities: any;

  isWelcomeDone = false;

  mounted() {
    this.fetchUsers();
    this.fetchCurrentUserId().then((currentUserId: string | undefined) => {
      if (!currentUserId) {
        this.userCreateSubmit(CURRENT_USER_INITIAL_USERNAME);
      }
    });

    this.fetchEmotions();
    this.fetchNotes();
    this.fetchHabits();
    this.fetchActivities();
  }

  @Watch("currentUserId", {
    deep: false,
    immediate: false,
  })
  currentUserIdChanged(value: any, oldValue: any) {
    if (!value) {
      this.userCreateSubmit(CURRENT_USER_INITIAL_USERNAME);
    }
  }

  async userCreateSubmit(username: string) {
    const user: User = await this.createUser({
      username: username,
    });
    this.setCurrentUserId(user._id);
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

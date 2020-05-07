<template>
  <div v-if="user" class="userHeader">
    <h1>{{ user.firstName }} {{ user.lastName }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { User } from "../store/user/types";

@Component
export default class UserHeader extends Vue {
  @Prop() private user!: User;
}
</script>

<style scoped lang="scss">
</style>

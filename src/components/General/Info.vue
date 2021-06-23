<template>
  <v-alert class="text-center py-12" text>
    <v-row class="pt-4">
      <v-col>
        <h2>Your Healthy Journal.</h2>
        <br />
        <h3>Gamified Emotions, Habits and Thoughts Tracker.</h3>
      </v-col>
    </v-row>
    <v-row class="pt-4">
      <v-col>
        <v-chip color="green" class="ma-4 px-12 py-4" label
          ><h2>Easy to use</h2></v-chip
        >
        <v-chip color="blue" class="ma-4 px-12 py-4" label
          ><h2>Anonymous</h2></v-chip
        >
        <v-chip color="purple" class="ma-4 px-12 py-4" label
          ><h2>Open-Source</h2></v-chip
        >
      </v-col>
    </v-row>
    <v-row class="pt-4">
      <v-col cols="6">
        <v-btn block large href="https://github.com/AndromedaTechnology/habitus"
          ><h3>GitHub - Frontend</h3></v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-btn
          block
          large
          href="https://github.com/AndromedaTechnology/habitus-api"
          ><h3>GitHub - API</h3></v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn block large href="https://medium.com/@habitus.today"
          ><h3>Medium</h3></v-btn
        >
        <v-btn block large href="https://twitter.com/HabitusToday"
          ><h3>Twitter</h3></v-btn
        >
      </v-col>
    </v-row>
    <v-row class="pt-4">
      <v-col>
        <h3>
          Crafted with ❤️ <br />
          by contributors around the 🌍 World and
          <a href="https://andromeda.technology/">🌌 Andromeda</a>.
        </h3>
      </v-col>
    </v-row>
  </v-alert>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Info",
})
export default class Info extends Vue {}
</script>

<template>
  <div class="text-center pa-12">
    <v-row>
      <v-col>
        <v-chip color="green" class="ma-4 px-12 py-4" label outlined
          ><h2>Easy to use</h2></v-chip
        >
        <v-chip color="blue" class="ma-4 px-12 py-4" label outlined
          ><h2>Anonymous</h2></v-chip
        >
        <v-chip color="purple" class="ma-4 px-12 py-4" label outlined
          ><h2>Open-Source</h2></v-chip
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn block outlined text large href="https://twitter.com/HabitusToday"
          ><h3>Twitter</h3></v-btn
        >
        <v-btn block outlined text large href="https://medium.com/@habitus.today"
          ><h3>Medium</h3></v-btn
        >
        <v-btn
          text
          block
          large
          outlined
          href="https://github.com/AndromedaTechnology/habitus-api"
          ><h3>GitHub - API</h3></v-btn
        >
        <v-btn block outlined text large href="https://github.com/AndromedaTechnology/habitus"
          ><h3>GitHub - Frontend</h3></v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3>
          Crafted with ❤️ <br />
          by contributors around the 🌍 World and
          <a href="https://andromeda.technology/">🌌 Andromeda</a>.
        </h3>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Info",
})
export default class Info extends Vue {}
</script>

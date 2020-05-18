<template>
  <div class="activityCreate" @contextmenu.prevent="$event.preventDefault()">
    <!-- Timer -->
    <div :class="{ timer: true }" v-if="habit.amountType === 'timer'">
      <button class="btn-dark" @click="toggleTimer(1)">
        {{ timerHandler ? "Stop" : "Up" }}
      </button>
      <vue-timepicker
        :format="timerFormat"
        v-model="timer"
        hide-clear-button
      ></vue-timepicker>
      <button class="btn-dark" @click="toggleTimer(0)">
        {{ timerHandler ? "Stop" : "Down" }}
      </button>
    </div>

    <!-- Amount -->
    <div :class="{ amount: true }" v-else-if="habit.amountType === 'amount'">
      <button
        class="btn-dark"
        v-touch:start="onDecreaseStart"
        v-touch:end="onDecreaseStop"
      >
        -
      </button>
      <input
        type="text"
        class="amount"
        v-model="amount"
        @keyup.enter="submit()"
      />
      <button
        class="btn-dark"
        v-touch:start="onIncreaseStart"
        v-touch:end="onIncreaseStop"
      >
        +
      </button>
    </div>

    <div class="submit">
      <button class="btn-dark" @click="submit()">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import "vue2-timepicker/dist/VueTimepicker.css";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Habit } from "../store/habit/types";

@Component({
  components: {
    VueTimepicker,
  },
})
export default class ActivityCreate extends Vue {
  @Prop() private habit!: Habit;
  amount = 1;
  increaseInterval: number | undefined = undefined;
  decreaseInterval: number | undefined = undefined;

  timerStartedAt: { HH: string; mm: string; ss: string } | null = null;
  timerHandler: number | null = null;
  timerFormat = "HH:mm:ss";
  timer = {
    HH: "00",
    mm: "00",
    ss: "00",
  };

  submit() {
    if (this.habit.amountType === "timer") {
      if (this.timerStartedAt) {
        //  For countdown: Submit diff of(startedAt, current)

        // (User stopeed before the end)
        // TODO: Add 1 second (currently missing)
        // TODO: Fix: Multi start/stop for countdown

        this.amount =
          (parseInt(this.timerStartedAt ? this.timerStartedAt.HH : "0") -
            parseInt(this.timer ? this.timer.HH : "0")) *
          60 *
          60;

        this.amount +=
          (parseInt(this.timerStartedAt ? this.timerStartedAt.mm : "0") -
            parseInt(this.timer ? this.timer.mm : "0")) *
          60;

        this.amount +=
          parseInt(this.timerStartedAt ? this.timerStartedAt.ss : "0") -
          parseInt(this.timer ? this.timer.ss : "0");
      } else {
        this.amount = parseInt(this.timer.HH) * 60 * 60;
        this.amount += parseInt(this.timer.mm) * 60;
        this.amount += parseInt(this.timer.ss);
      }

      this.resetTimer();
    } else if (this.habit.amountType === "amount") {
      //
    }

    this.$emit("submit", this.amount);
    this.amount = 1;
  }

  increaseAmount() {
    this.amount += 1;
  }
  decreaseAmount() {
    this.amount -= 1;
    this.amount = Math.max(this.amount, 1);
  }

  toggleTimer(increase = 1) {
    if (this.timerHandler) {
      // Stop timer

      clearInterval(this.timerHandler);
      this.timerHandler = null;
    } else {
      // Save initial time

      if (increase === 0) {
        this.timerStartedAt = this.timer;
      } else {
        this.timerStartedAt = null;
      }

      // Start Timer
      this.timerHandler = this.startTimer(increase);
    }
  }

  startTimer(increase = 1) {
    const changeAmount = 1;

    return setInterval(() => {
      let seconds = parseInt(this.timer.ss);
      let minutes = parseInt(this.timer.mm);
      let hours = parseInt(this.timer.HH);

      if (increase) {
        seconds = (seconds + changeAmount) % 60;
        if (seconds === 0) minutes = (minutes + changeAmount) % 60;
        if (seconds === 0 && minutes === 0) hours = (hours + changeAmount) % 24;
      } else {
        seconds = seconds - changeAmount;
        seconds = seconds < 0 ? 59 : seconds;

        if (seconds === 59) {
          minutes = minutes - changeAmount;
          minutes = minutes < 0 ? 59 : minutes;
        }

        if (seconds == 59 && minutes === 59) {
          hours = hours - changeAmount;
          hours = hours < 0 ? 23 : hours;
        }
      }

      this.timer.HH = hours < 10 ? "0" + hours : hours.toString();
      this.timer.ss = seconds < 10 ? "0" + seconds : seconds.toString();
      this.timer.mm = minutes < 10 ? "0" + minutes : minutes.toString();

      // Stop timer

      if (
        this.timer.HH == "00" &&
        this.timer.mm == "00" &&
        this.timer.ss == "00"
      ) {
        this.toggleTimer(increase);
      }
    }, 1000);
  }

  resetTimer() {
    this.timer = {
      HH: "00",
      mm: "00",
      ss: "00",
    };

    this.timerStartedAt = null;
  }

  onDecreaseStart() {
    this.decreaseInterval = setInterval(() => {
      this.decreaseAmount();
    }, 100);
  }
  onDecreaseStop() {
    clearInterval(this.decreaseInterval);
  }
  onIncreaseStart() {
    this.increaseInterval = setInterval(() => {
      this.increaseAmount();
    }, 100);
  }
  onIncreaseStop() {
    clearInterval(this.increaseInterval);
  }
}
</script>

<style scoped lang="scss">
.activityCreate {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .timer {
    * {
      display: block;
      &:not(:last-child) {
        margin-top: 8px;
        margin-bottom: 8px;
      }
    }
  }
  .amount {
    display: flex;
    &.center {
      justify-content: center;
    }
    input {
      width: 24px;
    }
  }

  .submit {
    margin-top: 8px;
  }
}
</style>

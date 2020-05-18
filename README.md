# Habitus - frontend

Track Habits Easily.

[https://habitus.andromeda.technology](https://habitus.andromeda.technology)

## Features

- Guest access, saving data to LocalStorage
- Create User
- Add Habits (Good or Bad)
- Add Activity to Habits (Points or Time)
- Showing Notifications for added Activity, with Sound (Good or Bad)
- Activity for each Habit is showed as a Line graph
- Showing User's Habits as a Doughnut chart (Good and Bad Habits)

## Tech

- Vue.js 2.6
- TypeScript 3.8
- PWA

## TODO

- Don't ask for username on first visit, allow any action: Allow for immediate app usage
- Habit.type == "timer": Show only one stop button
- ActivityCreateComponent: Design fix: show all buttons and inputs in one row
- Habit - Longest Streak: Show on Habit single page
- Habit timer type: transform seconds to hours:minutes:seconds on graph and in ActivityList
- Recurring Habits
- Add Habit.type == 'checkbox': Mark Habit as done; move to 'Past' filter
- API: enable a social component (following, including people in Habits)
- Wording: Habits became tasks, adjust wording and project name accordingly

## Installation

**Install packages**

`npm install`

**Compiles and hot-reloads for development**

`npm run serve`

**Compiles and minifies for production**

`npm run build`

**Run unit tests**

`npm run test:unit`

**Run end-to-end tests**

`npm run test:e2e`

**Lints and fixes files**

`npm run lint`

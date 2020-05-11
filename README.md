# Habitus - frontend

Track Habits Easily.

[https://habitus.andromeda.technology](https://habitus.andromeda.technology)

## Features

- Guest access, saving data to LocalStorage
- Create User
- Add Habits
- Add Activity (points, timer, (un)checked) to Habits
- Activity for each Habit is showed as a Line graph

## Tech

- Vue.js 2.6
- TypeScript 3.8
- PWA

## TODO

- Habit timer type - One stop button
- ActivityCreate Component - design fix - all in one row (timer, points)
- Habit - Longest Streak (show on Habit view page)
- Habits - Recurring
- Habits - type = 'checkbox' (mark as done; move to 'Past' filter)
- AddHabit navigation link and Component - show only when user is created
- Habit timer type - transform seconds to hours:minutes:seconds on graph and in ActivityList

- API - enable a social component (following, including people in Habits)
- Wording - Habits became tasks, adjust wording and project name accordingly

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

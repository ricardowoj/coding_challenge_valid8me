# valid8Me-Task-Manager
## Overview
🎉 Welcome to the valid8Me VueJS Coding Challenge!

🔎 Please read the instructions below carefully.

⏳ There is no time limit to this challenge, and you can use whatever resources you like to assist your submission.

## Requirements
This project uses [VueJS](https://vuejs.org/) ([v3](https://v3-migration.vuejs.org/)) and [Vite](https://vitejs.dev/), and was initialised using NodeJS `v16.19.0` and npm `v8.19.3`, although other NodeJS versions may work.

## Running the App
In your terminal, navigate to the project directory, then install the npm dependencies and run the app in development mode.

```
$ cd path/to/project/directory
$ npm i
$ npm start
```

## Submitting Your Solution
The recommended way to submit your finished solution is to compress (zip) the project folder and email it back to us: (dhayes@valid8me.com, nocarroll@valid8Me.com)

Tip: if you delete the `node_modules` directory before zipping you will have a much smaller filesize for the attachment. 🙂


## Coding Challenge
You have been handed over an unfinished frontend feature, written in VueJS. The feature uses a local mock API `services/api.js` to display a task component `V8Task.vue` in a task list container `V8TaskListContainer.vue`. You must finish the implementation of the feature, per the instructions below.

### 1. Display the Task Avatar
The task payload from the mock service includes a url for an avatar image. Update the component to display the image from the url, or fallback to the placeholder if there is no avatar url on the task.

**Acceptance Criteria:** We can see an avatar image on the task in the UI

### 2. List of Tasks
Currently, we are only seeing one task in the task manager. Update the app to display a list of tasks instead of a single task.

The mock function to get a list of tasks can be found in the `services/api.js`.

👉 Note: You should not need to make any changes to the `services/api.js` module.

**Acceptance Criteria:** We can see a list of tasks in the UI

### 3. Wire up the 'Complete Task' button in each In Progress task
When a task is In Progress, it displays a button. Currently, the button does not do anything.

Wire up the button to update the status on its parent task from `In Progress` to `Complete`

👉 Note: the data update can be done on the VueJS component data within the `App.vue` module.

**Acceptance Criteria:** We can visually update any `In Progress` task in the UI to `Complete`

### 4. Wire up the 'Complete All' button at the top of the Task Manager
There is a button at the top of the list labelled `Complete All`. Currently, the button does not do anything.

Wire up the button to update all `In Progress` tasks in the list to `Complete`

👉 Note: as in Step 3, the data update can be done on the VueJS component data within the `App.vue` module.

**Acceptance Criteria:** We can visually update all `In Progress` tasks in the UI to `Complete`

### 5. Add a new button at the top of the list called 'Hide Completed Tasks'
The product team has requested a new button to be added to the top of the list. When clicked, all `Complete` tasks in the list should not be visible, and the text of the button should now read `Show Completed Tasks`. When clicked again,  the `Complete` tasks should be visible and the button text should revert to its original value.

**Acceptance Criteria:** We can show and hide `Complete` tasks in the UI by toggling a new button at the top of the list


### 6. Further Improvements
While developing this feature, you may notice some things which could be improved visually or functionally. You can make further changes and enhancements to the application as you wish.

**Acceptance Criteria:** The look and feel of the finished solution will be considered in assessing the quality of the implementation.

## Final Notes
While there are number of components and modules in this application, you probably don't need to make changes to most of them to complete the challenge. However, feel free to update any code you like.

If you cannot run the app, or you get stuck in a way that is ungooglable, feel free to reach out to your contact at valid8Me and we can help unblock you.

Have fun, and best of luck 👾
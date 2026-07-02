# Contributing to WhatsWhen

First of all, thank you for considering contributing to **WhatsWhen** ❤️

## Context

WhatsWhen is my first React project and one of my earliest projects as a front-end developer. Because of that, I want to be transparent: I have very little experience with large-scale project architecture, contribution workflows, and open-source collaboration in general.

You may notice spaghetti code, inconsistent patterns, and architectural decisions that could definitely be improved. I’m still learning.

That said, if you still decide to contribute, I truly appreciate it. There is a lot I can learn from this process, and I’m grateful for any help, feedback, or improvements.

---

## Contribution Guidelines

At the moment, there are no strict contribution rules or workflows in place (such as branch naming conventions, commit standards, or PR templates).

For now, the general idea is simple:

* Be respectful and constructive
* Keep changes focused and easy to review
* Explain *why* a change is needed when opening a pull request
* Feel free to suggest architectural improvements

If you want to work on something, checking the todo list below would be a great place to start.

That said, you are **not limited to this list**, if there is a bug affecting your usage or a feature you would like to add, contributions are very welcome.

---

## Essential Todos

These are the highest-priority tasks at the moment:

* [ ] Fix tab indexing on the main page (currently breaks the UI)
* [ ] Add task reminders (notifications) when a task with `reminder: true` starts
* [ ] Add Pomodoro UI to the task card
* [ ] Implement Pomodoro timer functionality
* [ ] Add persistent state for todo items in `CardBody` and `CreateTask/EditTask`

  * Checked todo items should remain checked after page reload
  * This becomes tricky for recurring tasks because of the current IndexedDB data structure
* [ ] Add a default task card when the next scheduled task is in the future and there is no active task

  * This would fix styling issues related to the `currentTask` index
  * It should also display a timer showing when the next task starts
* [ ] Add import/export functionality for user data
* [ ] Test the app on Apple devices (`iOS`, `macOS`)

  * The custom install button will most likely break on Apple devices

---

## Quality of Life Improvements

* [ ] Automatically switch text inputs to RTL when typing in RTL languages
* [ ] Add a better font for Persian (Farsi) text
* [ ] `TaskCount` and `TaskPercentage` should show as complete for previous days
* [ ] When `CreateTask/EditTask` is open, add additional **Add Task** and **Cancel** buttons at the bottom of the page instead of the "plus button" that opens a "CreateTask" panel again.
* [ ] Keep popup panel headers fixed at the top while content scrolls underneath
* [ ] Preserve field state when users cancel or close the `CreateTask` panel
* [ ] Add entrance animations for more buttons and UI elements
* [ ] Fix mobile layout issue where the time input icon has no spacing from the input border (observed on Android Samsung Browser)

---

## Future Improvements (Not Urgent)

These are ideas for later and are not a priority right now:

* [ ] Build a custom emoji picker with:
  * Better accessibility
  * Better search keywords
  * Better UI
  * Support for native device emoji input / copy-paste
* [ ] Build a custom time picker with better UI
* [ ] Build a custom color picker with better UI
* [ ] Add a Capacitor wrapper for better native support and mobile builds
* [ ] Add an animated gradient border for the active task card
* [ ] Split context files for better scalability
* [ ] Refactor the app into a cleaner architecture and file structure
* [ ] Add a test suite
* [ ] Add local sync and/or cloud backup (for example via Google Drive)

---

## Final Note

Please keep in mind that this project is still evolving and many parts may change over time.

Even small contributions, bug fixes, refactors, documentation improvements, or suggestions, are appreciated.

Thank you for helping make WhatsWhen better.

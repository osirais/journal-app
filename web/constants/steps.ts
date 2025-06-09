import { Tour } from "nextstepjs";

export const steps: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        title: "Welcome",
        content: "This is your tree.",
        selector: "#tour-tree",
        icon: ""
      },
      {
        title: "Your Journal",
        content: "Here you can view and manage your journal entries.",
        selector: "#tour-journal",
        icon: ""
      },
      {
        title: "Add New Entry",
        content: "Click here to add a new journal entry.",
        selector: "#tour-journal-entry-button",
        icon: ""
      },
      {
        title: "Tasks Overview",
        content: "View your pending and completed tasks here.",
        selector: "#tour-tasks",
        icon: ""
      },
      {
        title: "Manage Tasks",
        content: "Use this button to add or edit your tasks.",
        selector: "#tour-tasks-manage-button",
        icon: ""
      },
      {
        title: "Activity Calendar",
        content: "See your activity and progress on this calendar.",
        selector: "#tour-activity-calendar",
        icon: ""
      },
      {
        title: "Mood Trends",
        content: "View your mood patterns over time here.",
        selector: "#tour-mood-trend",
        icon: ""
      }
    ]
  }
];

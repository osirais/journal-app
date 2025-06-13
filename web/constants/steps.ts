import { Tour } from "nextstepjs";

export const steps: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        title: "Welcome",
        content: "This is your garden.",
        selector: "#tour-garden",
        icon: "",
        nextRoute: "2"
      },
      {
        title: "Your Reasons",
        content: "Here you can manage your reasons.",
        selector: "#tour-reasons",
        icon: "",
        prevRoute: "0"
      },
      {
        title: "Your Journal",
        content: "Here you can view and manage your journal entries.",
        selector: "#tour-journal",
        icon: "",
        prevRoute: "1"
      },
      {
        title: "Add New Entry",
        content: "Click here to add a new journal entry.",
        selector: "#tour-journal-entry-button",
        icon: "",
        prevRoute: "1"
      },
      {
        title: "Your Mood",
        content: "Here you can log mood entries.",
        selector: "#tour-mood",
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
        icon: "",
        nextRoute: "3"
      },
      {
        title: "Activity Calendar",
        content: "See your activity and progress on this calendar.",
        selector: "#tour-activity-calendar",
        icon: "",
        prevRoute: "2"
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

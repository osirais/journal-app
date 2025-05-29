import { MoodCardCSR } from "@/components/dashboard/mood-csr";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MoodCardCSR> = {
  title: "Dashboard/MoodCardCSR",
  component: MoodCardCSR,
  parameters: {
    layout: "centered"
  },
  args: {
    initialMood: null,
    eligible: true,
    streak: 3
  }
};

export default meta;

type Story = StoryObj<typeof MoodCardCSR>;

export const Default: Story = {};

export const AlreadyClaimed: Story = {
  args: {
    initialMood: 4,
    eligible: false,
    streak: 5
  }
};

export const FullStreak: Story = {
  args: {
    initialMood: 5,
    eligible: true,
    streak: 7
  }
};

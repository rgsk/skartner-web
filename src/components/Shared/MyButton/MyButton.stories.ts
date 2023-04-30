import type { Meta, StoryObj } from '@storybook/react';
import MyButton from './MyButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MyButton> = {
  title: 'Shared/MyButton',
  component: MyButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'hii',
  },
};

import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import Input, {InputProps} from './input'

export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const 常规_Input = Template.bind({});
常规_Input.args = {
  style: {width: '300px'},
  placeholder: "placeholder"
};

export const 带图标的_Input = Template.bind({});
带图标的_Input.args = {
  style: {width: '300px'},
  placeholder: "input with icon",
  icon: "search"
};

export const 带前后缀的_Input = Template.bind({});
带前后缀的_Input.args = {
  style: {width: '300px'},
  placeholder: "google",
  prepend: "https://",
  append: ".com"
};

import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import Menu, {MenuProps} from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
export default {
  title: 'Components/Menu',
  component: Menu,
} as Meta;

export const Menu1: React.VFC<Story<MenuProps>> = (props) => {
  return (
    <Menu defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} >
      <MenuItem>
        cool link
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem> 
      <SubMenu title="dropdown">
          <MenuItem>
            dropdown1
          </MenuItem>
          <MenuItem disabled >
            dropdown1
          </MenuItem>
      </SubMenu>
      <MenuItem>
        cool link 2
      </MenuItem> 
    </Menu>
  )
}

(Menu1 as any).storyName = '水平Menu';

export const Menu2: React.VFC<Story<MenuProps>> = (props) => {
  return (
    <Menu mode={'vertical'} defaultIndex='0' onSelect={(index) => {action(`clicked ${index} item`)}} >
      <MenuItem>
        cool link
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem> 
      <SubMenu title="dropdown">
          <MenuItem>
            dropdown1
          </MenuItem>
          <MenuItem disabled >
            dropdown1
          </MenuItem>
      </SubMenu>
      <MenuItem>
        cool link 2
      </MenuItem> 
    </Menu>
  )
}

(Menu2 as any).storyName = '垂直Menu';


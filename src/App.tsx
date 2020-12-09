import React from 'react';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  return (
    <div className="App">
      <Icon icon="coffee" theme='danger' size='lg' />
      <Menu defaultIndex='0' mode='vertical' defaultOpenSubMenu={['2']} onSelect= {(index) => {console.log(index)}}>
        <MenuItem>
            link1
        </MenuItem>
        <MenuItem disabled >
            link2
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            dropdown1
          </MenuItem>
          <MenuItem disabled >
            dropdown1
          </MenuItem>
        </SubMenu>
        <MenuItem >
            link3
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;

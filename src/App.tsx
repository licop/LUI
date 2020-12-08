import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button'
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={0} onSelect= {(index) => {console.log(index)}}>
        <MenuItem  index={0}>
            link1
        </MenuItem>
        <MenuItem index={1}>
            link2
        </MenuItem>
        <MenuItem index={2}>
            link3
        </MenuItem>
      </Menu>

      <Button  btnType='default'>按钮</Button>
      <Button btnType='default' disabled>按钮</Button>
      <Button btnType='primary'>按钮</Button>
      <Button btnType='danger'>按钮</Button>
      <Button btnType='link' href="https://www.baidu.com" target="_blank">按钮</Button>
    </div>
  );
}

export default App;

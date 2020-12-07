import React from 'react';
import Button, {ButtonType, ButtonSize} from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button  btnType='default'>按钮</Button>
      <Button btnType='default' disabled>按钮</Button>
      <Button btnType='primary'>按钮</Button>
      <Button btnType='danger'>按钮</Button>
      <Button btnType='link' href="https://www.baidu.com" target="_blank">按钮</Button>
    </div>
  );
}

export default App;

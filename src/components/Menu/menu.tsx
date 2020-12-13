import React, {useState, createContext} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string,
    className?: string,
    /**
     * 模式，选择垂直模式还是水平模式
     */
    mode?: MenuMode,
    style?: React.CSSProperties,
    defaultOpenSubMenu?: string[],
    onSelect?: SelectCallback
}
interface IMenuContext {
    index: string,
    mode?: MenuMode,
    defaultOpenSubMenu?: string[],
    onSelect?: SelectCallback
}
export const MenuContext = createContext<IMenuContext>({index: '0'});

const Menu: React.FC<MenuProps> = (props) => {
    const {className, mode, style, children, defaultIndex, defaultOpenSubMenu, onSelect} = props;
    const classes = classNames('lui-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    })
    const [currentActive, setActive] = useState(defaultIndex);
    const handleClick = (index: string) => {
        setActive(index);
        if(onSelect) {
            onSelect(index);
        }
    }
    const passContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        mode,
        defaultOpenSubMenu,
        onSelect: handleClick,
        
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type;
            if(displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {index: index.toString()});
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenu: []
}

export default Menu;

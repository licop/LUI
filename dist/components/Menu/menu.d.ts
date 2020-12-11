import React from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
declare type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    defaultOpenSubMenu?: string[];
    onSelect?: SelectCallback;
}
interface IMenuContext {
    index: string;
    mode?: MenuMode;
    defaultOpenSubMenu?: string[];
    onSelect?: SelectCallback;
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;

import React, { FunctionComponentElement, useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition' ;

export interface SubMenuProps {
    index?: string,
    title: string,
    className?: string
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const context = useContext(MenuContext);
    const {index, title, children, className} = props;

    const opendSubMenus = context.defaultOpenSubMenu as Array<string>;
    const isOpend = (index && context.mode === 'vertical') ? opendSubMenus.includes(index) : false;
    const [open, setOpen] = useState(isOpend);
    const classes = classNames('menu-item submenu-item', className, {
        "is-active": context.index === index,
        "is-opened": open,
        "is-vertical": context.mode

    });
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!open);
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('lui-submenu', {
            'menu-opened': open
        });

        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if(childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        })
         
        return (
            <Transition 
                in={open}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
            
        )
    };

    return (<li key={index} className={classes} {...hoverEvents}>
        <div className="submenu-title" onClick={handleClick} {...clickEvents}>
            {title}
            <Icon icon="angle-down" className="arrow-icon" />
        </div>
        {renderChildren()}
    </li>)
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;

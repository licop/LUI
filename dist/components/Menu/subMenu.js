var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
var SubMenu = function (props) {
    var context = useContext(MenuContext);
    var index = props.index, title = props.title, children = props.children, className = props.className;
    var opendSubMenus = context.defaultOpenSubMenu;
    var isOpend = (index && context.mode === 'vertical') ? opendSubMenus.includes(index) : false;
    var _a = useState(isOpend), open = _a[0], setOpen = _a[1];
    var classes = classNames('menu-item submenu-item', className, {
        "is-active": context.index === index,
        "is-opened": open,
        "is-vertical": context.mode
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!open);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('lui-submenu', {
            'menu-opened': open
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + i
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: open, timeout: 300, animation: "zoom-in-top" },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title", onClick: handleClick }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;

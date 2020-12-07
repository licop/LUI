import React, { ReactNode } from 'react';
import classNames from 'classnames';


export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export type ButtonSize = 'lg' | 'sm';

interface BaseButtonProps {
    classname?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: React.ReactNode,
    href?: string
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        disabled,
        size,
        classname,
        children,
        href,
        ...restProps
    } = props;
    // btn, btn-lg, btn-primary
    const classes = classNames('btn', classname, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link' && disabled)
    });

    if(btnType === 'link' && href) {
        return <a 
          href={href}
          className={classes}
          {...restProps}
        >{children}</a>
    } else {
    return <button
           className={classes}
           disabled={disabled}
           {...restProps}
        >{children}
        </button>
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;
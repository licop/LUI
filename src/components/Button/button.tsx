import React from 'react';
import classNames from 'classnames';

export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export type ButtonSize = 'lg' | 'sm';

interface BaseButtonProps {
    /**
     * 设置按钮类型
     */
    btnType?: ButtonType;
    /**
     * 点击跳转的地址，指定此属性 button 的行为和 a 链接一致
     */
    href?: string;
    /**
     * 添加classname
    */
   classname?: string;
   /**
    * 按钮失效状态
    */
   disabled?: boolean;
   /**
    * 设置按钮大小
    */
   size?: ButtonSize;
   children?: React.ReactNode;
}
    
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * Button 组件
 */
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
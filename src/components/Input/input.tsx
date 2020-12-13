import React, {ChangeEvent, ReactElement, InputHTMLAttributes, HTMLAttributes} from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/Icon'

type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**
     * 禁用状态
     */
    disabled?: boolean,
    /**
     * 设置输入框大小
     */
    size?: InputSize,
    /**
     * 添加icon
     */
    icon?: IconProp,
    /**
     * 带有前缀图标的 input	
     */
    prepend?: string | ReactElement,
    /**
     * 	带有后缀图标的 input
     */
    append?: string | ReactElement,
    /**
     * 输入框内容变化时的回调
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Input输入框
 */
const Input: React.FC<InputProps> = (props) => {
    const {
       disabled,
       size,
       icon,
       prepend,
       append,
       style,
       ...restProps
    } = props;
    const cnames = classNames('lui-input-wrapper',  {
       [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend
    })
   
    const fixControlledValue = (value: any) => {
        if(value === null || value === undefined) {
            return ''
        }
        return value;
    }

    if('value' in props) {
       delete restProps.defaultValue;
       restProps.value = fixControlledValue(restProps.value)
    }

   return (
       <div className={cnames} style={style}>
           {prepend && <div className="lui-input-group-prepend">{prepend}</div>}
           {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
           <input
              className="lui-input-inner"
              disabled={disabled}
              {...restProps}
           />
           {append && <div className="lui-input-group-append">{append}</div>}
       </div>
   )
} 

export default Input;

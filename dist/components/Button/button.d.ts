import React from 'react';
export interface ButtonProps {
    /**
     * Is this the principal call to action on the page
     */
    primary?: boolean;
    /**
     * What color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
}
/**
 * Primary UI component for user interaction12
 */
declare const Button: React.FC<ButtonProps>;
export default Button;

import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';
export interface ProgressProps {
    percent: number;
    strokeHeight?: 15;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: FC<ProgressProps>;
export default Progress;

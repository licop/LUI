import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
    percent: number;
    strokeHeight?: 15;
    showText?: boolean,
    styles?: React.CSSProperties,
    theme?: ThemeProps
}

const Progress: FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        styles,
        theme,
      } = props

    return <div className="lui-progress-bar" style={styles}>
        <div className="lui-progress-bar-outer" style={{height: `${strokeHeight}px`}}>
            <div 
                className={`lui-progress-bar-inner color-${theme}`} 
                style={{width: `${percent}%`}}
            >
                {showText && <span className="inner-text">{`${percent}%`}</span>}
            </div>
        </div>
    </div>
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
}
export default Progress;
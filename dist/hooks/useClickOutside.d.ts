/**
 * 点击某个区域外的位置执行某个函数
 */
import { RefObject } from 'react';
declare function useClickOutside(ref: RefObject<HTMLElement>, handler: Function): void;
export default useClickOutside;

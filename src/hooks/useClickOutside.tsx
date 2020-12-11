/**
 * 点击某个区域外的位置执行某个函数
 */
import { RefObject, useEffect } from 'react';

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if(!ref.current || ref.current.contains(event.target as HTMLElement)) {
                return
            }
            handler(event);
        }
        document.addEventListener('click', listener);

        return (() => {
            document.removeEventListener('click', listener)
        })
    }, [ref, handler])
}

export default useClickOutside;

/**
 * 点击某个区域外的位置执行某个函数
 */
import { useEffect } from 'react';
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return (function () {
            document.removeEventListener('click', listener);
        });
    }, [ref, handler]);
}
export default useClickOutside;

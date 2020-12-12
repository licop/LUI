import { FC } from 'react';
import { UploadFile } from './upload';
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
declare const UploadList: FC<UploadListProps>;
export default UploadList;
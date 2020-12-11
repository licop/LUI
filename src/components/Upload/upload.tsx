import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import axios from 'axios';
import Dragger from './dragger';
import UploadList from './uploadList'

type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;  
}

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    withCredentials?: boolean;
    headers?: {[key: string]: any};
    name?: string;
    data?: {[key: string]: any};
    accept?: string
    multiple?: boolean
    drag?: boolean
}
const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        onProgress,
        onSuccess,
        onError,
        beforeUpload,
        onChange,
        onRemove,
        withCredentials,
        headers,
        data,
        name,
        accept,
        multiple,
        children,
        drag
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

    const uploadFileList = (uploadFile: UploadFile, uploadObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if(file.uid === uploadFile.uid) {
                    return {...file, ...uploadObj}
                } else {
                    return file;
                }
            })
        })
    }
    
    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click()
        } 
    }
    
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            if(!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file);
                if(result && result instanceof Promise) {
                    result.then(processFile => {
                        post(processFile)
                    }) 
                } else if(result !== false) {
                    post(file);
                }
            }
        })
    }
    
    const post = (file: File) => {
        const formData = new FormData();
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        formData.append(name || 'file', file);
        if(data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data' 
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if(percentage < 100 ) {
                    uploadFileList(_file, {percent: percentage, status: 'uploading'});
                    if(onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(resp => {
            uploadFileList(_file, {status: 'success', response: resp.data})
            
            if(onSuccess) {
                onSuccess(resp.data, file);
            }
            if(onChange) {
                onChange(file);
            }
        }).catch(err => {
            uploadFileList(_file, {status: 'error', error: err})
            if(onError) {
                onError(err, file);
            }
            if(onChange) {
                onChange(file);
            }
        })

    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(!files) {
            return;
        }
        uploadFiles(files);
        if(fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid)
        });
        if(onRemove) {
            onRemove(file);
        }
    }

    return <div className="lui-upload-component">
        <div 
            className="lui-upload-input"
            onClick={handleClick}
        >   
            {drag ? 
                <Dragger onFile={(files) => {uploadFiles(files)}}>
                    {children}
                </Dragger>:
                children
            }
            <input
                className="lui-file-input"
                style={{display: 'none'}}
                onChange={handleChange}
                type='file'
                ref={fileInput}
                accept={accept}
                multiple={multiple}
            />
        </div>
        <UploadList 
            fileList={fileList}
            onRemove={handleRemove}
        />
    </div>
}



export default Upload;

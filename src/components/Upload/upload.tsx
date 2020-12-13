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
    /**
     * 文件上传的目标路径地址
     */
    action: string;
    /**
     * 默认文件列表
     */
    defaultFileList?: UploadFile[];
    /**
     * 文件上传前回调函数
     */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**
     * 上传过程中回调
     */
    onProgress?: (percentage: number, file: File) => void;
    /**
     * 文件上传成功回调
     */
    onSuccess?: (data: any, file: File) => void;
    /**
     * 文件上传失误回调
     */
    onError?: (err: any, file: File) => void;
    /**
     * 状态改变时回调
     */
    onChange?: (file: File) => void;
    /**
     * 移除文件时回调
     */
    onRemove?: (file: UploadFile) => void;
    /**
     * 是否传递cookie
     */
    withCredentials?: boolean;
    /**
     * 请求头部设置
     */
    headers?: {[key: string]: any};
    /**
     * 上传文件名称
     */
    name?: string;
    /**
     * 上传时传递数据
     */
    data?: {[key: string]: any};
    /**
     * 接受文件类型
     */
    accept?: string
    /**
     * 是否支持多文件同时上传
     */
    multiple?: boolean
    /**
     * 是否支持拖动上传
     */
    drag?: boolean
}
/**
 * 上传文件组件
 */
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

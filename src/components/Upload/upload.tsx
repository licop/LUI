import React, {useState, useEffect, useRef, ChangeEvent} from 'react';
import axios from 'axios';
import Button from '../Button/button';

export interface UploadProps {
    action: string;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
}

const Upload: React.FC<UploadProps> = (props) => {
    const {
        action,
        onProgress,
        onSuccess,
        onError
    } = props;
    const fileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click()
        } 
    }
    
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files);
        postFiles.forEach(file => {
            const formData = new FormData();
            formData.append(file.name, file);
            axios.post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' 
                },
                onUploadProgress: (e) => {
                    let percentage = Math.round((e.load * 100) / e.total) || 0;
                    if(percentage < 100) {
                        if(onProgress) {
                            onProgress(percentage, file);
                        }
                    }
                }
            }).then(resp => {
                console.log(resp);
                if(onSuccess) {
                    onSuccess(resp.data, file);
                }
            }).catch(err => {
                console.error(err);
                if(onError) {
                    onError(err, file);
                }
            })
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
    return <div className="lui-uplaod-component">
        <Button 
            btnType="primary"
            onClick={handleClick}
        > 
            Upload File
        </Button>
        <input
            className="lui-file-input"
            style={{display: 'none'}}
            onChange={handleChange}
            type='file'
            ref={fileInput}
        ></input>
    </div>
}

export default Upload;

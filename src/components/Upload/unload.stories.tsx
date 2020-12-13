import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';
import Upload, {UploadProps} from './Upload';
import Button from '../Button/Button'
import Icon from '../Icon/Icon';

export default {
  title: 'Components/Upload',
  component: Upload,
} as Meta;


const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false;
  }
  return true;
}
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}

export const Upload1: React.FC<Story<UploadProps>> = (props) => {
  return (
    <Upload
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      onProgress={action('changed')}
      onSuccess={action('sucess')}
      onError={action('error')}
      beforeUpload={filePromise}
      onRemove={action('removed')}
      name="fileName"
      data={{'key': 'value'}}
      headers={{"X-Powered-By": 'licop'}}
      multiple
    >
      <Button>Upload</Button>
    </Upload>
  )
}
(Upload1 as any).storyName = '点击上传';

export const DragUpload: React.FC<Story<UploadProps>> = (props) => {
  return (
    <Upload
      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
      onProgress={action('changed')}
      onSuccess={action('sucess')}
      onError={action('error')}
      // beforeUpload={filePromise}
      onRemove={action('removed')}
      name="fileName"
      data={{'key': 'value'}}
      headers={{"X-Powered-By": 'licop'}}
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>Drag file over to upload</p>
    </Upload>
  )
}
(DragUpload as any).storyName = '拖动上传';

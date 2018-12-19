import * as AWS from 'aws-sdk'
import * as React from 'react'
import { DropzoneComponent } from 'react-dropzone-component'
import uuidv1 from 'uuid/v1'
import Action from '../IAction'

const bucket = 'musicmonkey-uploads'
const bucketRegion = 'eu-west-1'
const IdentityPoolId = 'eu-west-1:cf3e89d6-8cce-4eab-a432-fb3ba85798ba'

AWS.config.update({
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId
  }),
  region: bucketRegion
})

const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

const djsConfig = {
  addRemoveLinks: true,
  autoProcessQueue: false,
  dictDefaultMessage: 'Add Image',
  maxFiles: 1,
  paramName: 'event-image'
}

function upload(file: any) {
  const key = 'event-images/'
  const fileName = uuidv1() + '-' + file.name

  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        ACL: 'public-read',
        Body: file,
        Key: key + fileName,
        Bucket: bucket
      },
      err => {
        if (err) {
          reject(err)
        } else {
          resolve({
            imgUrl: `https://${bucket}.s3.amazonaws.com/${key}${fileName}`,
            dataUrl: file.dataURL
          })
        }
      }
    )
  })
}

const componentConfig = {
  postUrl: 'upload'
}

interface IFileUploadProps {
  onUpload(value: any): Action
  onUploadError(error: Error): Action
}

class FileUpload extends React.Component<IFileUploadProps, {}> {
  public render() {
    const { onUpload, onUploadError } = this.props
    const eventHandlers = {
      addedfile: (file: any) => {
        upload(file)
          .then(onUpload)
          .catch(onUploadError)
      }
    }
    return (
      <div>
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
        >
          {({ getRootProps }: any) => <div {...getRootProps()} />}
        </DropzoneComponent>
      </div>
    )
  }
}

export default FileUpload

import * as AWS from 'aws-sdk'
import * as React from 'react'
import { DropzoneComponent } from 'react-dropzone-component'
import uuidv1 from 'uuid/v1'
import Action from '../IAction'
import LoadingSpinner from '../loading/LoadingSpinner'

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
  uploadMultiple: false,
  autoProcessQueue: false,
  dictDefaultMessage: 'Add Image',
  maxFiles: 1,
  paramName: 'event-image',
  thumbnailWidth: 300,
  thumbnailHeight: 300
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
  maxFilesize: 2,
  postUrl: 'upload',
  iconFiletypes: ['.jpg', '.png'],
  showFiletypeIcon: true
}

interface IFileUploadProps {
  onUpload(value: any): Action
  onUploadError(error: Error): Action
}

class FileUpload extends React.Component<IFileUploadProps, {}> {
  public state = {
    showLoading: false
  }
  public toggleLoading = () => {
    this.setState({showLoading: !this.state.showLoading})
  }

  public render() {
    const { onUpload, onUploadError } = this.props
    const eventHandlers = {
      addedfile: async (file: any) => {
        this.toggleLoading()
        await upload(file)
          .then(onUpload)
          .catch(onUploadError)
        this.toggleLoading()
      }
    }

    return (
      <React.Fragment>
        {this.state.showLoading && (
          <LoadingSpinner/>
        )}
        <DropzoneComponent
          config={componentConfig}
          eventHandlers={eventHandlers}
          djsConfig={djsConfig}
        />
      </React.Fragment>
    )
  }
}

export default FileUpload

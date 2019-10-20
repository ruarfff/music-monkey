import React, { useState } from 'react'
import * as AWS from 'aws-sdk'
import { DropzoneComponent } from 'react-dropzone-component'
import uuidv1 from 'uuid/v1'
import LoadingSpinner from 'loading/LoadingSpinner'

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
  maxFilesize: 2,
  postUrl: 'upload',
  iconFiletypes: ['.jpg', '.png'],
  showFiletypeIcon: true
}

interface IFileUploadProps {
  width: number,
  height: number,
  onUpload(value: any): void
  onUploadError(error: Error): void
}

const FileUpload = ({ width, height, onUpload, onUploadError }: IFileUploadProps) => {
  const [loading, setLoading] = useState(false)

  const eventHandlers = {
    addedfile: async (file: any) => {
      setLoading(true)
      try {
        const res = await upload(file)
        onUpload(res)
      } catch (err) {
        onUploadError(err)
        console.error(err)
      }
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <DropzoneComponent
      config={componentConfig}
      eventHandlers={eventHandlers}
      djsConfig={{...djsConfig, thumbnailWidth: width, thumbnailHeight: height}}
    />
  )
}

export default FileUpload

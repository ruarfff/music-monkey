import React, { useState } from 'react'
//import * as AWS from 'aws-sdk'
//import { DropzoneComponent } from 'react-dropzone-component'
//import uuidv1 from 'uuid/v1'
import Dropzone from 'react-dropzone'
//import Resizer from 'react-image-file-resizer'
import 'react-image-crop/lib/ReactCrop.scss'
import FilePicker from './FilePicker'
import backgroundImg from 'assets/partycover.png'
import { Grid, Button } from '@material-ui/core'

// const bucket = 'musicmonkey-uploads'
// const bucketRegion = 'eu-west-1'
// const IdentityPoolId = 'eu-west-1:cf3e89d6-8cce-4eab-a432-fb3ba85798ba'

// AWS.config.update({
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId
//   }),
//   region: bucketRegion
// })

// const s3 = new AWS.S3({
//   apiVersion: '2006-03-01'
// })

// function upload(file: any) {
//   const key = 'event-images/'
//   const fileName = uuidv1() + '-' + file.name

//   return new Promise((resolve, reject) => {
//     s3.putObject(
//       {
//         ACL: 'public-read',
//         Body: file,
//         Key: key + fileName,
//         Bucket: bucket
//       },
//       err => {
//         if (err) {
//           reject(err)
//         } else {
//           resolve({
//             imgUrl: `https://${bucket}.s3.amazonaws.com/${key}${fileName}`,
//             dataUrl: file.dataURL
//           })
//         }
//       }
//     )
//   })
// }

// const componentConfig = {
//   maxFilesize: 2,
//   postUrl: 'upload',
//   iconFiletypes: ['.jpg', '.png'],
//   showFiletypeIcon: true
// }

interface IFileUploadProps {
  width: number
  height: number
  backgroundImage: string
  onUpload(value: any): void
  onUploadError(error: Error): void
}

const FileUpload = ({
  width,
  height,
  backgroundImage,
  onUpload,
  onUploadError
}: IFileUploadProps) => {
  //   const eventHandlers = {
  //     addedfile: async (file: any) => {
  //       try {
  //         const res = await upload(file)
  //         console.log(res)
  //         onUpload(res)
  //       } catch (err) {
  //         onUploadError(err)
  //         console.error(err)
  //       }
  //     }
  //   }

  const [src, setSrc] = useState()
  const [preview, setPreview] = useState()

  const onImageDrop = (files: any) => {
    console.log(files)
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setPreview(reader.result)
      setSrc(reader.result)
    })
    reader.readAsDataURL(files[0])
  }

  const onCrop = (preview: any) => {
    setPreview(preview)
  }

  const onClose = () => {
    setPreview(null)
  }
  console.log('SRC:', src)
  console.log('PREVIEW:', preview)

  const back = src || backgroundImg

  console.log(back)
  return (
    <div>
      <Dropzone multiple={false} accept="image/*" onDrop={onImageDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <div
                  {...getRootProps({
                    onClick: event => {
                      event.stopPropagation()
                    }
                  })}
                >
                  <FilePicker
                    width={390}
                    height={295}
                    cropRadius={100}
                    onCrop={onCrop}
                    onClose={onClose}
                    src={back}
                  />
                  <input {...getInputProps()} />

                  <Button onClick={getRootProps().onClick}>Click</Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <h5>Preview</h5>
                <img
                  alt=""
                  style={{ width: '200px', height: '200px' }}
                  src={preview}
                />
              </Grid>
            </Grid>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default FileUpload

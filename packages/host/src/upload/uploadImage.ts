import * as AWS from 'aws-sdk'
import uuidv1 from 'uuid/v1'

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

const uploadImage = (name: string, dataUrl: string, data: any) => {
  const key = 'event-images/'
  const fileName = uuidv1() + '-' + name

  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        ACL: 'public-read',
        Body: data,
        Key: key + fileName,
        Bucket: bucket
      },
      err => {
        if (err) {
          reject(err)
        } else {
          resolve({
            imgUrl: `https://${bucket}.s3.amazonaws.com/${key}${fileName}`,
            dataUrl
          })
        }
      }
    )
  })
}

export default uploadImage

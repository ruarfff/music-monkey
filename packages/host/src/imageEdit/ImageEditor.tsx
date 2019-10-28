import React, { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import { Grid, Button } from '@material-ui/core'

interface IImageEditorProps {
  image: any
  onImageChanged?(data: any): void
}

const ImageEditor = ({
  image,
  onImageChanged = (_: any) => {}
}: IImageEditorProps) => {
  const [preview, setPreview] = useState()
  const imageEditor = useRef<AvatarEditor>(null)

  const handleSave = (_: any) => {
    if (imageEditor) {
      const canvas = imageEditor.current!.getImage()
      const url = canvas.toDataURL()
      canvas.toBlob(blob => {
        console.log(blob)
        onImageChanged({ ...image, url, data: blob })
      })
    }
  }

  const handlePreviewChange = (_?: any) => {
    if (imageEditor) {
      const canvas = imageEditor.current!.getImage()
      setPreview(canvas.toDataURL())
    }
  }

  const onImageDrop = (files: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      onImageChanged({ ...image, url: reader.result, name: files[0].name })
    })
    reader.readAsDataURL(files[0])
  }

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
                  <AvatarEditor
                    ref={imageEditor}
                    image={image.url}
                    width={250}
                    height={250}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={1.2}
                    rotate={0}
                    onImageReady={handlePreviewChange}
                    onImageChange={handlePreviewChange}
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
                <Button onClick={handleSave}>Save</Button>
              </Grid>
            </Grid>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default ImageEditor

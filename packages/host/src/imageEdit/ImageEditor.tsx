import React, { useState, useRef } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import Slider from '@material-ui/core/Slider'

interface ImageEditorProps {
  initialImage: any
  onImageChanged?(data: any): void
}

const ImageEditor = ({
  initialImage,
  onImageChanged = (_: any) => {}
}: ImageEditorProps) => {
  const [image, setImage] = useState(initialImage)
  const [imageZoom, setImageZoom] = useState(1)
  const imageEditor = useRef<AvatarEditor>(null)

  let imageUrl =
    image.url && image.url.startsWith('data')
      ? image.url
      : image.url + '?' + new Date().getSeconds()

  //console.log(imageUrl)
  const handleChange = (_?: any) => {
    if (imageEditor && imageEditor.current) {
      try {
        const canvas = imageEditor.current!.getImage()
        const url = canvas.toDataURL()
        if (url === imageUrl) {
          canvas.toBlob(blob => {
            const updatedImage = { ...initialImage, url, data: blob }
            onImageChanged(updatedImage)
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }

  const onImageDrop = (files: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      const newImage = {
        ...initialImage,
        url: reader.result,
        name: files[0].name
      }
      setImage(newImage)
      onImageChanged(newImage)
    })
    reader.readAsDataURL(files[0])
  }

  const valueText = (value: number) => {
    return `${value}`
  }

  const handleZoom = (_: any, newValue: number | number[]) => {
    setImageZoom(newValue as number)
  }

  return (
    <div className="ImageEditor-root">
      <Dropzone multiple={false} accept="image/*" onDrop={onImageDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <Grid container>
              <Grid item xs={12}>
                <Typography align="center" component="div">
                  <div
                    {...getRootProps({
                      onClick: event => {
                        event.stopPropagation()
                      }
                    })}
                  >
                    <AvatarEditor
                      crossOrigin="anonymous"
                      ref={imageEditor}
                      image={imageUrl}
                      width={200}
                      height={200}
                      border={50}
                      color={[255, 255, 255, 0.8]} // RGBA
                      scale={imageZoom}
                      rotate={0}
                      onImageChange={handleChange}
                    />
                    <input {...getInputProps()} />
                  </div>
                  <Slider
                    defaultValue={1}
                    value={imageZoom}
                    getAriaValueText={valueText}
                    aria-labelledby="image-zoom-slider"
                    valueLabelDisplay="auto"
                    step={0.05}
                    marks
                    min={0.1}
                    max={2}
                    onChange={handleZoom}
                  />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={getRootProps().onClick}
                >
                  Upload New Image
                </Button>
              </Grid>
            </Grid>
          </section>
        )}
      </Dropzone>
    </div>
  )
}

export default ImageEditor

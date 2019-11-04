import React, { useState, useRef } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import Slider from '@material-ui/core/Slider'
import backgroundImg from 'assets/partycover.jpg'

interface ImageEditorProps {
  onImageChanged?(data: any): void
}

const ImageEditor = ({ onImageChanged = (_: any) => {} }: ImageEditorProps) => {
  const [imageZoom, setImageZoom] = useState(1)
  const [image, setImage] = useState<any>({ url: backgroundImg })
  const imageEditor = useRef<AvatarEditor>(null)

  const handleChange = (_?: any) => {
    if (imageEditor) {
      const canvas = imageEditor.current!.getImage()
      const url = canvas.toDataURL()
      canvas.toBlob(blob => {
        const updatedImage = { ...image, url, data: blob }
        onImageChanged(updatedImage)
      })
    }
  }

  const onImageDrop = (files: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImage({ ...image, url: reader.result, name: files[0].name })
      onImageChanged({ ...image, url: reader.result, name: files[0].name })
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
    <div>
      <Dropzone multiple={false} accept="image/*" onDrop={onImageDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography align="center" component="div">
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
                      width={200}
                      height={200}
                      border={50}
                      color={[255, 255, 255, 0.8]} // RGBA
                      scale={imageZoom}
                      rotate={0}
                      onImageChange={handleChange}
                      onImageReady={handleChange}
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

import React, { useState } from 'react'

interface ImageProps {
  alt: string
  src: string
  fallbackSrc: string
}

const Image = ({ alt, src, fallbackSrc }: ImageProps) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <img src={fallbackSrc} alt={alt} />
  } else {
    return <img src={src} alt={alt} onError={() => setFailed(true)} />
  }
}

export default Image

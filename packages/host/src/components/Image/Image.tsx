import React, { useState } from 'react'

interface ImageProps {
  alt: string
  src: string
  fallbackSrc: string
  className?: string
}

const Image = ({ alt, src, fallbackSrc, className }: ImageProps) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <img src={fallbackSrc} alt={alt} className={className} />
  } else {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className={className}
      />
    )
  }
}

export default Image

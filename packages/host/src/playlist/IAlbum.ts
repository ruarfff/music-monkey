import Image from 'image/Image'

export interface IArtist {
  name: string
}

export default interface IAlbum {
  images: Image[]
  artists: IArtist[]
}

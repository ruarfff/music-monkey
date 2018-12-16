import IImage from './IImage'

export interface IArtist {
  name: string;
}

export default interface IAlbum {
  images: IImage[];
  artists: IArtist[];
}

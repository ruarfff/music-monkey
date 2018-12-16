interface ILatLng {
  lat?: number
  lng?: number
}

export default interface ILocation {
  address: string
  latLng: ILatLng
}

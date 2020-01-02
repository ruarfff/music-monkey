interface ILatLng {
  lat?: number
  lng?: number
}

export default interface Location {
  address: string
  latLng: ILatLng
}

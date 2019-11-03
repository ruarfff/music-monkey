import * as Yup from 'yup'

export default Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string(),
  organizer: Yup.string().required('Event organizer is required'),
  tracks: Yup.array().required(),
  image: Yup.object(),
  genre: Yup.string(),
  location: Yup.object(),
  settings: Yup.object()
})

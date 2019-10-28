import SaveEventFormValues from './SaveEventFormValues'
import uploadImage from 'upload/uploadImage'

const saveEventFlow = async ({ image }: SaveEventFormValues) => {
  try {
    console.log(image)
    const uploadedImage = await uploadImage(image.name, image.url, image.data)
    console.log(uploadedImage)
  } catch (err) {
    console.log(err)
  }

  // Upload Image
  // Create Playlist
  // Save Event
}

export default saveEventFlow

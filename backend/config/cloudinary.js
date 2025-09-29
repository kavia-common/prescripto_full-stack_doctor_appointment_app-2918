import { v2 as cloudinary } from 'cloudinary'

/**
 * Configure Cloudinary only if required environment variables are present.
 * This avoids throwing during startup in environments where Cloudinary is not configured.
 */
const connectCloudinary = async () => {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } = process.env

  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY) {
    console.warn(
      'Cloudinary environment variables are not fully set. Skipping Cloudinary configuration.'
    )
    return
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY
  })

  console.log('Cloudinary configured.')
}

export default connectCloudinary

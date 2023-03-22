const isProd = process.env.NODE_ENV === 'production'

type StorageProviderType = 'cloudinary' | 'local'

export const cloudinaryCredentials = () => ({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const provider: StorageProviderType =
  process.env.STORAGE_PROVIDER || isProd ? 'cloudinary' : 'local'

export const mediasFolderUrl = 'http://192.168.0.108:4000/medias/'
//  provider === 'cloudinary' ? null : `${process.env.DEV_API_URL}/uploads/`
// provider === 's3'
//   ? `https://${process.env.STORAGE_BUCKET}.s3.amazonaws.com/`

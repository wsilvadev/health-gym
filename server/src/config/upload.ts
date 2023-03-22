import crypto from 'crypto'
import path from 'path'

import multer, { StorageEngine } from 'multer'

import { storageConfig } from '.'

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  driver: typeof storageConfig.driver

  tmpFolder: string
  uploadsFolder: string

  multer: {
    storage: StorageEngine
  }

  config: {
    // disk: {}
    aws: {
      bucket: string
    }
  }
}

export const uploadConfig: IUploadConfig = {
  driver: storageConfig.driver,

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      },
    }),
  },

  config: {
    //disk: {},
    aws: {
      bucket: storageConfig.bucket,
    },
  },
}

import { IStorageProvider } from './i-storage-provider'

export class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file)
    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(storedFile => storedFile === file)
    this.storage.splice(findIndex, 1)
  }
}

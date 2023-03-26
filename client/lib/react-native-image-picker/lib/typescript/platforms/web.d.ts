import { Callback, ImageLibraryOptions, ImagePickerResponse } from '../types'
export declare function camera(options?: ImageLibraryOptions, callback?: Callback): Promise<ImagePickerResponse>;
export declare function imageLibrary(options?: ImageLibraryOptions, callback?: Callback): Promise<ImagePickerResponse>;

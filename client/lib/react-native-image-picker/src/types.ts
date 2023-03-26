export type Callback = (response: ImagePickerResponse) => any;

export interface OptionsCommon {
  formatAsMp4?: boolean;
  includeBase64?: boolean;
  includeExtra?: boolean;
  maxHeight?: number;
  maxWidth?: number;
  mediaType: MediaType;
  presentationStyle?:
    | 'currentContext'
    | 'fullScreen'
    | 'pageSheet'
    | 'formSheet'
    | 'popover'
    | 'overFullScreen'
    | 'overCurrentContext';
  quality?: PhotoQuality;
  videoQuality?: AndroidVideoOptions | iOSVideoOptions;
}

export interface ImageLibraryOptions extends OptionsCommon {
  selectionLimit?: number;
}

export interface CameraOptions extends OptionsCommon {
  cameraType?: CameraType;
  durationLimit?: number;
  saveToPhotos?: boolean;
}

export interface Asset {
  base64?: string;
  bitrate?: number;
  duration?: number;
  fileName?: string;
  fileSize?: number;
  height?: number;
  id?: string;
  timestamp?: string;
  type?: string;
  uri?: string;
  width?: number;
}

export interface ImagePickerResponse {
  assets?: Asset[];
  didCancel?: boolean;
  errorCode?: ErrorCode;
  errorMessage?: string;
}

export type PhotoQuality =
  | 0
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1;
export type CameraType = 'back' | 'front';
export type MediaType = 'photo' | 'video' | 'mixed';
export type AndroidVideoOptions = 'low' | 'high';
export type iOSVideoOptions = 'low' | 'medium' | 'high';
export type ErrorCode = 'camera_unavailable' | 'permission' | 'others';

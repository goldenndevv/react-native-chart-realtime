export interface RequestListModel {
  filter?: string;
  group?: string;
  skip?: string;
  take?: number; //default 20
}
export interface listEmojiResponse {
  items: {
    name: string; // name emoji
    url: string; // url
  }[];
  totalCount: number;
}
export interface listStickerModel {
  items: {
    name: string;
    group: string;
    url: string;
    contentType: string;
    size: number;
  }[];
  totalCount: number;
}
export interface responseUpload {
  id: string;
  publicId: string;
  fileExtension: string;
  contentType: string;
  name: string;
  creationTime: string;
  url: string;
}

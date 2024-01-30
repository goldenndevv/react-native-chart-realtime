import { Api, type ResResults } from './helper';
import type {
  RequestListModel,
  listEmojiResponse,
  listStickerModel,
} from './models/cdnModel';
import type { defaultResponseApi } from './models/manager';

export class ChatCdn {
  baseUrl: string;
  api: Api;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.api = new Api(this.baseUrl, token);
    if (!baseUrl) {
      throw new Error('Missing baseUrl parameter');
    }
  }

  async uploadEmoji(data: FormData): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'POST',
      url: 'api/cdn/emoji/upload',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  async getEmoji(emojiName: string): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'GET',
      url: 'api/cdn/emoji/emoji-image',
      params: { emojiName },
    });
  }
  async deleteEmoji(emojiName: string): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'DELETE',
      url: 'api/cdn/emoji/emoji-image',
      params: { emojiName },
    });
  }

  async listEmoji(
    data: RequestListModel
  ): Promise<ResResults<listEmojiResponse>> {
    return this.api.request<listEmojiResponse>({
      method: 'GET',
      url: 'api/cdn/emoji/emoji-image-listing',
      data,
    });
  }

  async uploadStickers(data: FormData): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'POST',
      url: 'api/cdn/stickers/upload',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async createGroup(groupName: string): Promise<ResResults<{ data: string }>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/cdn/stickers/sticker-groups',
      data: { groupName },
    });
  }

  async getGroup(groupName: string): Promise<ResResults<{ groups: string[] }>> {
    return this.api.request<{ groups: string[] }>({
      method: 'GET',
      url: 'api/cdn/stickers/sticker-groups',
      params: groupName,
    });
  }

  async listSticker(
    data: RequestListModel
  ): Promise<ResResults<listStickerModel>> {
    return this.api.request<listStickerModel>({
      method: 'GET',
      url: 'api/cdn/stickers/sticker-image-listing',
      params: data,
    });
  }

  // File Upload
  async fileUpload(data: FormData): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'POST',
      url: 'file/upload',
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
  async upload(url: string, data: FormData): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'POST',
      url,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

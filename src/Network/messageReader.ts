import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { errorResponse, successResponse, type ResResults } from './helper';
import type {
  ChatMessageDataHistoryModel,
  getHistoryRequest,
  historyAttachmentReq,
  historyAttachmentRes,
  lastMessageUserGroupReq,
  lastMessageUserGroupRes,
  searchAttachmentInGroupRes,
  searchMessegeInGroupReq,
  searchMessegeInGroupRes,
} from './models/message';

export class MessageReader {
  baseUrl: string;
  axios: AxiosInstance;
  token: string;

  constructor(url: string, token: string) {
    this.baseUrl = url;
    this.axios = axios.create({
      baseURL: this.baseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!url || !token) {
      throw Error('Missing url or token param');
    }
    this.token = token;
    if (token) {
      this.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }

  private async request<T>(
    method: 'GET' | 'POST',
    url: string,
    config: AxiosRequestConfig
  ): Promise<ResResults<T>> {
    return new Promise<ResResults<T>>((resolve) => {
      this.axios
        .request<T>({ method, url, ...config })
        .then((res) => resolve(successResponse(res.data)))
        .catch((error) => resolve(errorResponse(error?.response || error)));
    });
  }

  // Message reader service

  async chatHistory({
    roomId,
    data,
  }: {
    roomId: string;
    data: getHistoryRequest;
  }): Promise<ResResults<ChatMessageDataHistoryModel>> {
    return this.request('GET', `api/messagereader/message/history/${roomId}`, {
      params: data,
    });
  }

  async lastMessageUserGroup(
    data: lastMessageUserGroupReq
  ): Promise<ResResults<lastMessageUserGroupRes>> {
    return this.request(
      'GET',
      'api/messagereader/message/user-group-last-read-message',
      {
        params: data,
      }
    );
  }

  async historyAttachment({
    roomId,
    data,
  }: {
    roomId: string;
    data: historyAttachmentReq;
  }): Promise<ResResults<historyAttachmentRes>> {
    return this.request(
      'POST',
      `api/messagereader/message/history-attachment/${roomId}`,
      {
        params: data,
      }
    );
  }

  async searchMessegeInGroup({
    roomId,
    data,
  }: {
    roomId: string;
    data: searchMessegeInGroupReq;
  }): Promise<ResResults<searchMessegeInGroupRes>> {
    return this.request('POST', `api/messagereader/message/search/${roomId}`, {
      params: {
        ...data,
      },
    });
  }

  // Other methods, e.g., searchAttachmentInGroup, getHistoryAroundMessage, getLastMessagePined
  async getHistoryAroundMessage(data: {
    roomId: string;
    messageId: string;
    take: number;
  }): Promise<ResResults<searchMessegeInGroupRes>> {
    return this.request(
      'GET',
      `api/messagereader/message/history-by-message-id`,
      {
        params: data,
      }
    );
  }
  async getLastMessagePined({
    roomId,
  }: {
    roomId: string;
  }): Promise<ResResults<searchMessegeInGroupRes>> {
    return this.request('GET', `api/messagereader/message/search/${roomId}`, {
      params: { roomId },
    });
  }
  async searchAttachmentInGroup(data: {
    roomId: string;
    messageId: string;
    take: number;
  }): Promise<ResResults<searchAttachmentInGroupRes>> {
    return this.request(
      'POST',
      `api/messagereader/message/search-attachment/${data.roomId}`,
      {
        data: data,
      }
    );
  }
  async getBookMark(data: {
    roomId: string;
    messageId: string;
    take: number;
  }): Promise<ResResults<searchMessegeInGroupRes>> {
    return this.request(
      'GET',
      `api/messagereader/message/book-mark/${data.roomId}`,
      {
        params: data,
      }
    );
  }
  async getHistoryMentions({
    roomId,
    data,
  }: {
    roomId: string;
    data: getHistoryRequest;
  }): Promise<ResResults<searchMessegeInGroupRes>> {
    return this.request(
      'GET',
      `  api/messagereader/message/history-mentions/${roomId}`,
      {
        params: data,
      }
    );
  }
}

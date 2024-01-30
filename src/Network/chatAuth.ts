import { Api, type ResResults } from './helper';
import type {
  AccessTokenResponse,
  UserCredentials,
  UserRegisterReq,
  checkBlockUserRes,
  encryptResponse,
  listUserContactAddRes,
  listUserRequest,
  listUserRes,
} from './models/auth';
import type { defaultResponseApi } from './models/manager';

export class ChatUser {
  baseUrl: string;
  api: Api;

  constructor(baseUrl: string, token: string) {
    if (!baseUrl) {
      throw new Error('Missing baseUrl parameter');
    }
    this.baseUrl = baseUrl;
    this.api = new Api(this.baseUrl, token);
  }

  // Authentication Service
  async login(data: UserCredentials): Promise<ResResults<AccessTokenResponse>> {
    return this.api.request<AccessTokenResponse>({
      method: 'POST',
      url: 'api/auth/account/Login',
      data,
    });
  }

  async register(
    data: UserRegisterReq
  ): Promise<ResResults<AccessTokenResponse>> {
    return this.api.request<AccessTokenResponse>({
      method: 'POST',
      url: 'api/auth/account/Register',
      data,
    });
  }

  async listUserContactAdd(
    data: string[]
  ): Promise<ResResults<listUserContactAddRes>> {
    return this.api.request<listUserContactAddRes>({
      method: 'POST',
      url: 'api/auth/user-relationship/get-list-user-contact-add',
      data: { phoneNumbers: data },
    });
  }

  async userDoAction({
    userId,
    actionType,
  }: {
    userId: string;
    actionType: number;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/auth/user-relationship/user-do-action',
      data: { id: userId, actionType },
    });
  }

  async searchFriends(data: listUserRequest): Promise<ResResults<listUserRes>> {
    return this.api.request<listUserRes>({
      method: 'GET',
      url: 'api/auth/user-relationship/search-users',
      params: data,
    });
  }

  async listFriends(data: listUserRequest): Promise<ResResults<listUserRes>> {
    return this.api.request<listUserRes>({
      method: 'GET',
      url: 'api/auth/user-relationship/friends',
      params: data,
    });
  }
  async checkBlockUser(userId: string): Promise<ResResults<checkBlockUserRes>> {
    return this.api.request<checkBlockUserRes>({
      method: 'GET',
      url: 'api/auth/user-relationship/check-block-user',
      data: { userId },
    });
  }
  async checkFriendUser(userId: string): Promise<ResResults<boolean>> {
    return this.api.request<boolean>({
      method: 'GET',
      url: 'api/auth/user-relationship/check-block-user',
      data: { userId },
    });
  }
  async userEncryptKey(): Promise<ResResults<encryptResponse>> {
    return this.api.request<encryptResponse>({
      method: 'GET',
      url: 'api/auth/account/user-encrypt-key',
    });
  }
  async deleteEncryptKey(): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'DELETE',
      url: 'api/auth/account/user-encrypt-key',
    });
  }
  async totalUser(): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'GET',
      url: 'api/auth/user-relationship/total-user',
    });
  }
}

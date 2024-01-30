import type { defaultResponseApi } from './manager';

export interface UserCredentials {
  userName: string;
  passWord: string;
  pushToken?: string; // Dấu hỏi chấm (?) biểu thị rằng thuộc tính này là tùy chọn
}
export interface UserRegisterReq {
  username?: string;
  email?: string;
  phoneNumber?: string;
  gender?: number;
  avatar?: string;
  dateOfBirth?: string;
  password?: string;
  image?: {
    fileId?: string;
    fileName?: string;
    extension?: string;
    fileUrl?: string;
    contentType?: string;
  };
  isAdmin?: boolean;
}
export interface AccessTokenResponse extends ApiError {
  userId?: string;
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details: string;
    data: any;
    validationErrors: ValidationError[];
  };
}

interface ValidationError {
  message: string;
  members: string[];
}

export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  gender: number;
  dateOfBirth: string;
  isFriend: boolean;
  distance: number;
}
export interface listUserContactAddRes extends defaultResponseApi {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phoneNumber: string;
  gender: number;
  dateOfBirth: string;
  isFriend: boolean;
  distance: number;
}
[];

export interface listUserRequest {
  GroupId?: string;
  Filters?: string;
  Sorting?: number; //1.2.3
  SkipCount?: number; //default 0
  MaxResultCount?: number;
}
export interface listUserRes extends defaultResponseApi {
  items: UserInfo[];
  pageSize: number;
  totalCount: number;
}
export interface checkBlockUserRes {
  senderBlock: boolean;
  receiverBlock: boolean;
  blockerId: string;
}
export interface encryptResponse {
  encKey: string;
  pubKey: string;
  keyType: string;
}

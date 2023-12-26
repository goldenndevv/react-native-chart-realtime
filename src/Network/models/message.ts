import type { defaultResponseApi } from './manager';

export interface getHistoryRequest {
  after?: string;
  before?: string;
  isPined?: boolean;
  skip: number; //default 0
  take: number;
}
export interface lastMessageUserGroupReq {
  roomId?: string; // Id of group
  userId?: string; //Id of user to check
}
export interface historyAttachmentReq {
  before?: string; //
  after?: string; //messageid after
  types?: number[]; // -   VIDEO = 1,AUDIO = 2,IMAGE = 3,FILE = 4,OTHER = 5

  skip?: number; // point start record
  take?: number; // The number of records retrieved
}
export interface searchMessegeInGroupReq {
  textSearch?: string; //  text search
  skip?: number; // point start record
  take?: number; // The number of records retrieved
}
export interface lastMessageUserGroupRes {
  // response
  lastReadMessageId?: string; // id mess last read
  userSendLastRead?: string; // userid last read mes
  lastReadMessageTimeSend?: string;
}
export interface ChatMessageDataHistoryModel extends defaultResponseApi {
  skip: number;
  take: number;
  messages: ChatMessage[];
  users?: ChatUserModel[];
  lastReadMessageId?: string;
  userSendLastRead?: string;
  lastReadMessageTimeSend?: string;
}

export interface ChatMessage {
  id?: string;
  messageContentRaw?: string;
  message?: string;
  timeSend?: string;
  senderId?: string;
  roomId?: string;
  mentionsIds?: string[];
  receiperId?: string;
  reactions?: ChatReaction[];
  attachments?: ChatAttachment[];
  type?: number;
  revokeEnum?: number;
  isDeleted?: boolean;
  isEdited?: boolean;
  lastEditTime?: string;
  countValue?: number;
  isSave?: boolean;
  isPined?: boolean;
  isPinedById?: string;
  lastPinedTime?: string;
}

export interface ChatReaction {
  reactorId?: string;
  reactCode?: string;
}

export interface ChatAttachment {
  name?: string;
  desciption?: string;
  id: string;
  url?: string;
  urlPreView?: string;
  typeAttachment?: number;
  messageId?: string;
  sizeByte?: number;
  durationSeconds?: number;
  revoke?: number;
}

export interface ChatUserModel {
  id?: string;
  avatar?: string;
  roles?: string[];
  username?: string;
  nickName?: string;
  displayName?: string;
  defautlStatus?: number;
  isOnline?: boolean;
}
export interface historyAttachmentRes extends defaultResponseApi {
  id: string;
  messageContentRaw?: string;
  message?: string;
  timeSend?: string; // Should be of type Date, but it's provided as a string
  senderId?: string;
  roomId?: string;
  mentionsIds?: string[];
  receiperId?: string;
  reactions?: Reaction[];
  attachments?: Attachment[];
  type?: number;
  revokeEnum?: number;
  isDeleted?: boolean;
  isEdited?: boolean;
  lastEditTime?: string; // Should be of type Date, but it's provided as a string
  countValue?: number;
  isSave?: boolean;
  isPined?: boolean;
}

interface Reaction {
  reactorId?: string;
  reactCode?: string;
}

interface Attachment {
  name?: string;
  desciption?: string;
  id?: string;
  url?: string;
  urlPreView?: string;
  typeAttachment?: number;
  messageId?: string;
  sizeByte?: number;
  durationSeconds?: number;
  revoke?: number;
}
export interface searchMessegeInGroupRes {
  messageId?: string; // id message
  message?: string; // message
  textSearch?: string;
  messageIds?: string[];
  messages?: ChatMessage[];
  users?: ChatUserModel[];
  skip: number;
  take: number;
  totalCountFinded?: number;
  takeOffset?: number;
}
export interface searchAttachmentInGroupRes {
  data: {
    name: string;
    desciption: string;
    id: string;
    url: string;
    urlPreView: string;
    typeAttachment: number;
    messageId: string;
    sizeByte: number;
    durationSeconds: number;
    revoke: number;
    senderId: string;
    receiperId: string;
    roomId: string;
    timeSend: string;
  }[];
  skip: number;
  take: number;
}

export interface ChatMessageProp {
  message: string;
  attachments?: attachmentsModel[];
  type: number;
  quoteMessageId?: string;
  forwardMessageId?: string;
  forwardFromRoomId?: string;
  mentionIds?: string[];
}
export interface attachmentsModel {
  name?: string; // name file
  desciption?: string;
  id?: string; // id attachments (send id = null or string)
  url: string; // url file
  urlPreView?: string;
  typeAttachment: number; // - video = 1,  // - audio = 2// - image = 3// - file = 4 // - other = 5
  messageId?: string;
  sizeByte?: number;
  durationSeconds?: number;
  revoke?: number; // 1 revoke
}
export interface MessageUpdateProp {
  message: string;
}
export type ChatMessageModel = Partial<{
  attachments?: attachmentsModel[];
  forwardFromMessageId: string;
  forwardFromRoomId: string;
  mentionIds: string[];
  message: string;
  messageId: string;
  quoteFromMessageId: string;
  roomId: string;
  senderId: string;
  senderProfile: {
    avatar: string;
    displayname: string;
    id: string;
    username: string;
  };
  timeSend: string;
  type: number;
}>;
export interface PinMessageProps {
  messageId?: string; // message id pin
  groupId?: string; // id group
  displayName?: string; // display name sender
  messageContent?: string; // content pin message
}
export interface pinMessageModel {
  messageId?: string;
  roomId?: string;
  userId?: string;
  displayName?: string;
  messageContent?: string;
}
export type UnpinMessageProps = Omit<
  PinMessageProps,
  'displayName' | 'messageContent'
>;
export interface reactMessageReactionResponse {
  messageId?: string;
  groupId?: string;
  userId?: string;
  reactionCode: string;
}
export interface receiveMessageReactionResponse {
  messageId?: string;
  groupId?: string;
  userId?: string;
}
export interface inputRevokeMessage {
  messageId: string;
  groupId: string;
  revokeStatus: number;
  attachmentId?: string;
  timeSend: string;
}
export interface onRevokeMessageResponse {
  messageId?: string;
  groupId?: string;
  userId?: string;
  attachmentId?: string;
  revokeStatus: number;
}
export interface userIsTypingResponse {
  roomId?: string;
  userId?: string;
}

export interface baseResponse {
  roomId?: string;
  userId?: string;
  encryptKey?: string;
}

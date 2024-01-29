import io, { Socket } from 'socket.io-client';
import type {
  ChatMessageModel,
  ChatMessageProp,
  MessageUpdateProp,
  PinMessageProps,
  UnpinMessageProps,
  inputRevokeMessage,
  onRevokeMessageResponse,
  pinMessageModel,
  reactMessageReactionResponse,
  receiveMessageReactionResponse,
  userIsTypingResponse,
} from './model';

export class ChatSocket {
  baseUrl: string;
  socket: Socket;
  token: string;
  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.socket = io(baseUrl, {
      transports: ['websocket'],
      autoConnect: true,
      query: { token: token },
    });
    this.token = token;
  }

  connect() {
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('connected to socket server');
    });
  }
  off(event: string) {
    this.socket.off(event);
  }
  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(data: ChatMessageProp, groupId: string) {
    this.socket.emit('sendMessage', data, groupId);
  }
  updateMessage(
    idMessageEdit: string,
    message: MessageUpdateProp,
    groupId: string
  ) {
    this.socket.emit('updateMessage', idMessageEdit, message, groupId);
  }
  setMessageSeenStatus(messageId: string, groupId: string) {
    this.socket.emit('setMessageSeenStatus', groupId, messageId);
  }
  deleteMessage(messageId: string, groupId: string) {
    this.socket.emit('deleteMessage', messageId, groupId);
  }
  receiveMessage(callback: (data: ChatMessageModel) => void) {
    this.socket.on('receiveMessage', (message: ChatMessageModel) => {
      callback(message);
    });
  }

  receiveDeleteMessage(callback: (data: ChatMessageModel) => void) {
    this.socket.on('receiveDeleteMessage', (message) => {
      callback(message);
    });
  }
  receiveUpdateMessage(callback: (data: ChatMessageModel) => void) {
    this.socket.on('receiveUpdateMessage', (message: ChatMessageModel) => {
      callback(message);
    });
  }
  checkBlockInGroup(callback: (data: ChatMessageModel) => void) {
    this.socket.on('checkBlockInGroup', (message: ChatMessageModel) => {
      callback(message);
    });
  }
  pinMessage(data: PinMessageProps) {
    this.socket.emit(
      'pinMessage',
      data.messageId,
      data.groupId,
      data.displayName,
      data.messageContent
    );
  }
  receivePinMessage(callback: (data: pinMessageModel) => void) {
    this.socket.on('receivePinMessage', (message: pinMessageModel) => {
      callback(message);
    });
  }
  unpinMessage(data: UnpinMessageProps) {
    this.socket.emit('unpinMessage', data);
  }
  receiveUnpinMessage(callback: (data: pinMessageModel) => void) {
    this.socket.on('receiveUnpinMessage', (message: pinMessageModel) => {
      callback(message);
    });
  }
  receiveTotalUnread(callback: (data: any) => void) {
    this.socket.on('receiveTotalUnread', (data: any) => callback(data));
  }
  getTotalUnread(userId: string) {
    this.socket.emit('getTotalUnread', userId);
  }
  reactMessage(data: reactMessageReactionResponse) {
    this.socket.emit(
      'reactMessage',
      data.messageId,
      data.groupId,
      data.reactionCode
    );
  }
  receiveMessageReaction(
    callback: (data: reactMessageReactionResponse) => void
  ) {
    this.socket.on(
      'receiveMessageReaction',
      (message: reactMessageReactionResponse) => {
        callback(message);
      }
    );
  }

  receiveMessageSeenStatus(
    callback: (data: receiveMessageReactionResponse) => void
  ) {
    this.socket.on(
      'receiveMessageSeenStatus',
      (message: receiveMessageReactionResponse) => {
        callback(message);
      }
    );
  }
  revokeMessage(data: inputRevokeMessage) {
    this.socket.emit(
      'revokeMessage',
      data.messageId,
      data.groupId,
      data.revokeStatus,
      data.timeSend
    );
  }
  onRevokeMessage(callback: (data: onRevokeMessageResponse) => void) {
    this.socket.on('onRevokeMessage', (message: onRevokeMessageResponse) => {
      callback(message);
    });
  }
  revokeAttachment(data: inputRevokeMessage) {
    this.socket.emit(
      'revokeAttachment',
      data.messageId,
      data.attachmentId,
      data.groupId,
      data.revokeStatus
    );
  }
  onRevokeAttachment(callback: (data: onRevokeMessageResponse) => void) {
    this.socket.on('onRevokeAttachment', (message: onRevokeMessageResponse) => {
      callback(message);
    });
  }
  typingMessage(groupId: string) {
    this.socket.emit('typingMessage', groupId);
  }
  userIsTyping(callback: (data: userIsTypingResponse) => void) {
    this.socket.on('userIsTyping', (message: userIsTypingResponse) => {
      callback(message);
    });
  }
  joinGroup(groupId: string) {
    this.socket.emit('joinGroup', groupId);
  }
  onJoinGroup(callback: (data: boolean) => void) {
    this.socket.on('onJoinGroup', (message: boolean) => {
      callback(message);
    });
  }
  leaveGroup(groupId: string) {
    this.socket.emit('leaveGroup', groupId);
  }
  onLeaveGroup(callback: (data: boolean) => void) {
    this.socket.on('onLeaveGroup', (message: boolean) => {
      callback(message);
    });
  }
  newGroupCreated(callback: (data: any) => void) {
    this.socket.on('newGroupCreated', (message: any) => {
      callback(message);
    });
  }
  newGroupObjCreated(callback: (data: any) => void) {
    this.socket.on('newGroupObjCreated', (message: any) => {
      callback(message);
    });
  }
  unseenMessageStatus(groupId: string, customerId: string) {
    this.socket.emit('setMessageUnseenStatus', groupId, customerId);
  }
  receiveUnseenMessageStatus(
    callback: (data: { roomId: string; userId: string }) => void
  ) {
    this.socket.on(
      'receiveMessageUnseenStatus',
      (data: { roomId: string; userId: string }) => {
        callback(data);
      }
    );
  }
  receiveUnseenMessageCount(
    callback: (data: { groupId: string; messageUnread: number }) => void
  ) {
    this.socket.on(
      'receiveUnseenMessageCount',
      (data: { groupId: string; messageUnread: number }) => callback(data)
    );
  }

  customEvent<T>(eventName: string, data: T) {
    this.socket.emit(eventName, data);
  }

  customEventReceive<T>(eventName: string, callback: (data: T) => void) {
    this.socket.on(eventName, (data: T) => {
      callback(data);
    });
  }
  sendEncryptKey(groupId: string, encryptKey: string) {
    this.socket.emit('sendEncryptKey', groupId, encryptKey);
  }
  requestEncryptKey(groupId: string) {
    this.socket.emit('sendEncryptKey', groupId);
  }
}

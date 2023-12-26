import { ChatSocket } from './Chat';
import { ChatUser } from './Network/chatAuth';
import { ChatManagement } from './Network/chatManage';
import { MessageReader } from './Network/messageReader';

export * from './Chat';
export * from './Network/messageReader';
export * from './Network/chatManage';
export * from './Network/chatAuth';
export * from './Network/chatAuth';
export * from './Network/models/message';
export * from './Network/models/auth';
export * from './Network/models/manager';
export * from './Network/models/cdnModel';
export * from './Network/models/model';
export * from './Chat/model';
export * from './Network/helper';

export function InitChatSocket(url: string, token: string) {
  const chat = new ChatSocket(url, token);
  return chat;
}

export function InitChatUser(url: string, token: string) {
  const api = new ChatUser(url, token);
  return api;
}

export function InitChatManagement(url: string, token: string) {
  const api = new ChatManagement(url, token);
  return api;
}

export function InitMessageReader(url: string, token: string) {
  const api = new MessageReader(url, token);
  return api;
}

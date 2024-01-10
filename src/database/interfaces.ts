import { Database, Collection } from '@nozbe/watermelondb';

import * as models from './models';
import type { ChatMessage } from '../Network/models/message';
import type { ChatRoomItem } from '../Network/models/manager';

export type TAppDatabaseNames =
  | typeof models.ROOMS_TABLE
  | typeof models.MESSAGES_TABLE
  | typeof models.SETTINGS_TABLE
  | typeof models.USERS_TABLE;

type ObjectType<T> = T extends typeof models.ROOMS_TABLE
  ? ChatRoomItem
  : T extends typeof models.MESSAGES_TABLE
  ? ChatMessage
  : T extends typeof models.SETTINGS_TABLE
  ? any
  : T extends typeof models.USERS_TABLE
  ? any
  : never;

export type TAppDatabase = {
  get: <T extends TAppDatabaseNames>(db: T) => Collection<ObjectType<T>>;
} & Database;

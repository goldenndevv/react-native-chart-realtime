import { Model } from '@nozbe/watermelondb';
import { field, json } from '@nozbe/watermelondb/decorators';

import { sanitizer } from '../utils';

export const ROOMS_TABLE = 'rooms';

export default class Room extends Model {
  static table = ROOMS_TABLE;

  @json('lastMessage', sanitizer) lastMessage;
  @field('rId') rId;
  @field('name') name;
  @field('encrypted') encrypted;

  @field('e2e_key_id') e2eKeyId;

  @field('roomType') roomType;
  @field('typeOfGroup') typeOfGroup;
  @field('topic') topic;
  @field('description') description;
  @field('image') image;
  @field('ownerId') ownerId;
  @field('participantCount') participantCount;

  @json('participantInfo', sanitizer) participantInfo;

  @json('leaveGroupHistories', sanitizer) leaveGroupHistories;

  @field('hasUnreadMessage') hasUnreadMessage;
  @json('tags', sanitizer) tags;

  @field('unreadCount') unreadCount;
  @field('isFavorite') isFavorite;
  @field('notifyStatus') notifyStatus;
  @field('totalCount') totalCount;
}

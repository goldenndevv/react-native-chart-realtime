import { Model } from '@nozbe/watermelondb';
import { date, field, json } from '@nozbe/watermelondb/decorators';

import { sanitizer } from '../utils';

export const MESSAGES_TABLE = 'messages';

export default class Message extends Model {
  static table = MESSAGES_TABLE;

  // static associations = {
  //   subscriptions: { type: 'belongs_to', key: 'rid' },
  // };
  @field('mId') mId;

  @field('messageContentRaw') messageContentRaw;

  @field('message') message;

  @date('timeSend') timeSend;
  @field('senderId') senderId;
  @field('rId') rId;

  @json('mentionsIds', sanitizer) mentionsIds;

  @field('receiperId') receiperId;
  @json('reactions', sanitizer) reactions;

  @json('attachments', sanitizer) attachments;

  @field('type') type;
  @field('revokeEnum') revokeEnum;
  @field('isDeleted') isDeleted;

  @field('isEdited') isEdited;
  @date('lastEditTime') lastEditTime;

  @field('countValue') countValue;
  @field('isSave') isSave;
  @field('isPined') isPined;
  @field('isPinedById') isPinedById;
  @field('avatar') avatar;
  @field('username') username;
  @field('userId') userId;

  @date('lastPinedTime') lastPinedTime;

  asPlain() {
    return {
      id: this.id,
      mId: this.mId,
      messageContentRaw: this.messageContentRaw,
      timeSend: this.timeSend,
      senderId: this.senderId,
      mentionsIds: this.mentionsIds,
      receiperId: this.receiperId,
      type: this.type,
      avatar: this.avatar,
      attachments: this.attachments,
      revokeEnum: this.revokeEnum,
      isDeleted: this.isDeleted,
      isEdited: this.isEdited,
      lastEditTime: this.lastEditTime,
      countValue: this.countValue,
      isSave: this.isSave,
      reactions: this.reactions,
      isPined: this.isPined,
      isPinedById: this.isPinedById,
      lastPinedTime: this.lastPinedTime,
      username: this.username,
      userId: this.userId,
    };
  }
}

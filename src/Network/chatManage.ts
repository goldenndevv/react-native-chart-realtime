import { Api, type ResResults } from './helper';
import type {
  ChatRoomInfoRequest,
  ChatRoomInformationModel,
  ChatRoomListSearchModel,
  ChatRoomModel,
  CreateChatRoomInput,
  RoomRequest,
  SearchRoomRequest,
  UpdateResponeModel,
  defaultResponseApi,
  inviteGroupMemberRequest,
  listRoomChatRequest,
  requestJoinListResponse,
  romChatModifyRequest,
  toggleGroupInviteLinkRes,
} from './models/manager';

export class ChatManagement {
  baseUrl: string;
  api: Api;
  token: string;

  constructor(url: string, token: string) {
    if (!url || !token) {
      throw Error('Missing url or token param');
    }
    this.baseUrl = url;
    this.token = token;
    this.api = new Api(this.baseUrl, this.token);
  }

  // Chat management service
  async settingAccessModifierGroup({
    groupId,
    isPublic,
  }: {
    groupId: string;
    isPublic: boolean;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: `api/chat-management/group-setting/setting-access-modifier-group/${groupId}`,
      data: { isPublic },
    });
  }

  async setAddmin(params: {
    groupid: string;
    userid: string;
    isAdmin: boolean;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/group-setting/set-addmin',
      params: params,
    });
  }

  async setModerator(params: {
    groupid: string;
    userid: string;
    isModerator: boolean;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/group-setting/set-moderator',
      params: {
        ...params,
        isModerator: params.isModerator ?? true,
      },
    });
  }

  async setDiamond(params: {
    groupid: string;
    userid: string;
    isDiamond?: boolean;
    level: number;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/group-setting/set-diamond',
      params: {
        ...params,
        isDiamond: params.isDiamond ?? true,
      },
    });
  }

  async setIgnoredUser(params: {
    groupid: string;
    userid: string;
    isIgnored: boolean;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/group-setting/set-ignored-user',
      params: params,
    });
  }

  async setMuteUser(params: {
    groupid: string;
    userid: string;
    isMute: boolean;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/group-setting/set-mute-user',
      params: params,
    });
  }

  async requestJoinList(data: {
    groupid: string;
    skip?: number;
    take?: number;
  }): Promise<ResResults<requestJoinListResponse>> {
    return this.api.request<requestJoinListResponse>({
      method: 'POST',
      url: `api/chat-management/group-setting/request-join-list/${data.groupid}`,
      params: {
        skip: data.skip ?? 0,
        take: data.take ?? 100,
      },
    });
  }

  async acceptRequest(
    requestId: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: `api/chat-management/group-setting/accept-request/${requestId}`,
    });
  }

  async rejectRequest(
    requestId: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: `api/chat-management/group-setting/reject-request/${requestId}`,
    });
  }

  async blockRequest(
    requestId: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: `api/chat-management/group-setting/block-request/${requestId}`,
    });
  }

  async searchRoomChat(
    data: SearchRoomRequest
  ): Promise<ResResults<ChatRoomListSearchModel>> {
    return this.api.request<ChatRoomListSearchModel>({
      method: 'GET',
      url: `api/chat-management/chat-groups/search-group-chat`,
      params: data,
    });
  }

  async listRoomChatModification(
    data: romChatModifyRequest
  ): Promise<ResResults<ChatRoomModel>> {
    return this.api.request<ChatRoomModel>({
      method: 'GET',
      url: `api/chat-management/chat-groups/participated-group-chat-list-modification`,
      params: data,
    });
  }

  async getTotalUnread(): Promise<ResResults<any>> {
    return this.api.request<any>({
      method: 'GET',
      url: `api/chat-management/chat-groups/total-unread`,
    });
  }

  async listRoomChat(
    data: listRoomChatRequest
  ): Promise<ResResults<ChatRoomModel>> {
    return this.api.request<ChatRoomModel>({
      method: 'GET',
      url: `api/chat-management/chat-groups/participated-group-chat-list${
        data?.userId ? '/' + data?.userId : ''
      }`,
      params: data,
    });
  }
  async getInfoRoomChat(
    groupId: string
  ): Promise<ResResults<ChatRoomInformationModel>> {
    return this.api.request<ChatRoomInformationModel>({
      method: 'GET',
      url: `api/chat-management/chat-groups/chat-group-by-id/${groupId}`,
    });
  }
  async groupParticipants({
    groupId,
    data,
  }: {
    groupId: string;
    data: RoomRequest;
  }): Promise<ResResults<ChatRoomModel>> {
    return this.api.request<ChatRoomModel>({
      method: 'GET',
      url: `api/chat-management/chat-groups/group-participants/${groupId}`,
      params: data,
    });
  }

  async setFavoriteGroup({
    groupId,
    isFavorite,
  }: {
    groupId: string;
    isFavorite: boolean;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: `api/chat-management/chat-groups/${groupId}/set-favorite-group`,
      data: { isFavorite },
    });
  }
  async getFavoriteGroup(
    param: RoomRequest
  ): Promise<ResResults<ChatRoomModel>> {
    return this.api.request<ChatRoomModel>({
      method: 'GET',
      url: `api/chat-management/chat-groups/favorite-group-list`,
      params: param,
    });
  }

  async getUnreadOfEachAgent(
    listAgents: string[]
  ): Promise<Record<string, number>> {
    return this.api.request<Record<string, number>>({
      url: '/api/chat-management/chat-groups/total-unread-of-each-agent',
      data: listAgents,
      method: 'POST',
    });
  }

  async createRoomChat(
    data: CreateChatRoomInput
  ): Promise<ResResults<UpdateResponeModel>> {
    return this.api.request<UpdateResponeModel>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/chat-group',
      data: data,
    });
  }

  async updateInfoRoom({
    roomId,
    data,
  }: {
    roomId: string;
    data: ChatRoomInfoRequest;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'PUT',
      url: `api/chat-management/chat-groups/${roomId}/chat-group`,
      data: data,
    });
  }

  async deleteChatRoom(
    roomId: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'DELETE',
      url: `api/chat-management/chat-groups/${roomId}/chat-group`,
    });
  }

  async joinChatGroup({
    groupId,
    userId,
  }: {
    groupId: string;
    userId: string;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/join-chat-group',
      data: { groupId, userId },
    });
  }

  async leaveChatGroup(
    groupId: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/leave-chat-group',
      data: { groupId },
    });
  }

  async inviteChatGroup(
    data: inviteGroupMemberRequest
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/invite-user-group',
      data: data,
    });
  }

  async removeUserChatGroup({
    groupId,
    userId,
  }: {
    groupId: string;
    userId: string;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/remove-user-group',
      data: { groupId, userId },
    });
  }
  async togleGroupInviteLink({
    groupId,
    isEnabled,
  }: {
    groupId: string;
    isEnabled: boolean;
  }): Promise<ResResults<toggleGroupInviteLinkRes>> {
    return this.api.request<toggleGroupInviteLinkRes>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/toggle-group-invite-link',
      data: { groupId, isEnabled },
    });
  }
  async joinGroupByInviteLink(
    key: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'GET',
      url: 'api/chat-management/chat-groups/join-by-invite-link',
      params: { key },
    });
  }
  async userDeleteChatGroup(
    groupId: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/user-delete-chat-group',
      data: { groupId },
    });
  }
  async userHideChatGroup(
    groupId: string
  ): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/user-hide-chat-group',
      data: { groupId },
    });
  }
  async toggleGroupNotify({
    groupId,
    status,
  }: {
    groupId: string;
    status: boolean;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-groups/turn-on-off-group-notify',
      data: { groupId, status },
    });
  }

  async blockUser({
    userId,
  }: {
    userId: string;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-users/block-user',
      data: { userId },
    });
  }
  async unBlockUser({
    userId,
  }: {
    userId: string;
  }): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'POST',
      url: 'api/chat-management/chat-users/unblock-user',
      data: { userId },
    });
  }
  async deleteAllgroup(): Promise<ResResults<defaultResponseApi>> {
    return this.api.request<defaultResponseApi>({
      method: 'DELETE',
      url: 'api/chat-management/chat-groups/all-chat-group',
    });
  }

  // End Chat Management Service
}

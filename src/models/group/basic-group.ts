import {TdlibType} from '../tdlib-type';
import {ChatMemberStatusCreator} from '../chat/chat-member-status-creator';

export class BasicGroup extends TdlibType {
    id: number;
    is_active: boolean;
    member_count: number;
    status: ChatMemberStatusCreator;
    upgraded_to_supergroup_id: number;
}

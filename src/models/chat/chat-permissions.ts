import {TdlibType} from '../tdlib-type';

export class ChatPermissions extends TdlibType {
    can_add_web_page_previews: boolean;
    can_change_info: boolean;
    can_invite_users: boolean;
    can_pin_messages: boolean;
    can_send_media_messages: boolean;
    can_send_messages: boolean;
    can_send_other_messages: boolean;
    can_send_polls: boolean;
}

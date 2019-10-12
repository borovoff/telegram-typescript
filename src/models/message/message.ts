import {TdlibType} from '../tdlib-type';
import {MessageText} from './message-text';

export class Message extends TdlibType {
    author_signature: string;
    can_be_deleted_for_all_users: boolean;
    can_be_deleted_only_for_self: boolean;
    can_be_edited: boolean;
    can_be_forwarded: boolean;
    chat_id: number;
    contains_unread_mention: boolean;
    content: MessageText;
    date: number;
    edit_date: number;
    id: number;
    is_channel_post: boolean;
    is_outgoing: boolean;
    media_album_id: string;
    reply_to_message_id: number;
    sender_user_id: number;
    ttl: number;
    ttl_expires_in: number;
    via_bot_user_id: number;
    views: number;
}

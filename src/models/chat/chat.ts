import {TdlibType} from '../tdlib-type';
import {ChatTypePrivate} from './chat-type-private';
import {ChatPhoto} from './chat-photo';
import {ChatPermissions} from './chat-permissions';
import {ChatNotificationSettings} from './chat-notification-settings';

export class Chat extends TdlibType {
    can_be_deleted_for_all_users: boolean;
    can_be_deleted_only_for_self: boolean;
    can_be_reported: boolean;
    client_data: string;
    default_disable_notification: boolean;
    id: number;
    is_marked_as_unread: boolean;
    is_pinned: boolean;
    is_sponsored: boolean;
    last_read_inbox_message_id: number;
    last_read_outbox_message_id: number;
    notification_settings: ChatNotificationSettings;
    order: string;
    permissions: ChatPermissions;
    photo: ChatPhoto;
    pinned_message_id: number;
    reply_markup_message_id: number;
    title: string;
    type: ChatTypePrivate;
    unread_count: number;
    unread_mention_count: number;
}

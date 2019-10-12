import {TdlibType} from './tdlib-type';

export class ScopeNotificationSettings extends TdlibType {
    disable_mention_notifications: boolean;
    disable_pinned_message_notifications: boolean;
    mute_for: number;
    show_preview: boolean;
    sound: string;
}

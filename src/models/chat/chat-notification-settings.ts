import {TdlibType} from '../tdlib-type';

export class ChatNotificationSettings extends TdlibType {
    disable_mention_notifications: boolean;
    disable_pinned_message_notifications: boolean;
    mute_for: number;
    show_preview: boolean;
    sound: string;
    use_default_disable_mention_notifications: boolean;
    use_default_disable_pinned_message_notifications: boolean;
    use_default_mute_for: boolean;
    use_default_show_preview: boolean;
    use_default_sound: boolean;
}

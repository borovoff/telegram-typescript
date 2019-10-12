import {TdlibType} from '../tdlib-type';
import {ChatNotificationSettings} from './chat-notification-settings';

export class UpdateChatNotificationSettings extends TdlibType {
    chat_id: number;
    notification_settings: ChatNotificationSettings;
}

import {TdlibType} from './tdlib-type';
import {ScopeNotificationSettings} from './scope-notification-settings';

export class UpdateScopeNotificationSettings extends TdlibType {
    notification_settings: ScopeNotificationSettings;
    scope: TdlibType;
}

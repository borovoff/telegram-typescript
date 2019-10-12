import {TdlibType} from '../tdlib-type';
import {UserFullInfo} from './user-full-info';

export class UpdateUserFullInfo extends TdlibType {
    user_full_info: UserFullInfo;
    user_id: number;
}

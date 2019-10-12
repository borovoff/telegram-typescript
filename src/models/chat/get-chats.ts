import {TdlibType} from '../tdlib-type';
import {TG_CONSTANT} from '../../tg-constant';

export class GetChats extends TdlibType {
    offset_order: string;
    offset_chat_id: number;
    limit: number;

    constructor(offset_chat_id: number, limit: number, offset_order: string = TG_CONSTANT.default_offset_order) {
        super();
        this['@type'] = 'getChats';

        this.limit = limit;
        this.offset_chat_id = offset_chat_id;
        this.offset_order = offset_order;
    }
}

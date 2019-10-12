import {TdlibType} from '../tdlib-type';
import {File} from '../file/file';

export class ChatPhoto extends TdlibType {
    small: File;
    big: File;
}

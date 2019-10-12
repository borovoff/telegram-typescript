import {TdlibType} from '../tdlib-type';

export class RemoteFile extends TdlibType {
    id: string;
    is_uploading_active: boolean;
    is_uploading_completed: boolean;
    uploaded_size: number;
}

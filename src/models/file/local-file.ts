import {TdlibType} from '../tdlib-type';

export class LocalFile extends TdlibType {
    can_be_deleted: boolean;
    can_be_downloaded: boolean;
    download_offset: number;
    downloaded_prefix_size: number;
    downloaded_size: number;
    is_downloading_active: boolean;
    is_downloading_completed: boolean;
    path: string;
}

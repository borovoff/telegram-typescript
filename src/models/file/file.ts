import {LocalFile} from './local-file';
import {RemoteFile} from './remote-file';
import {TdlibType} from '../tdlib-type';

export class File extends TdlibType {
    expected_size: number;
    id: number;
    local: LocalFile;
    remote: RemoteFile;
    size: number;
}

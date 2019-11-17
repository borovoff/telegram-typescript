import {TdlibType} from "../tdlib-type";
import {File} from "../file/file";

export class Document extends TdlibType {
    document: File;
    file_name: string;
    mime_type: string;
}

import {File} from "../models/file/file";
import {UpdateListener} from "../models/update-listener";

export class FileStore {
    files = {};

    add(file: File, listener) {
        const updateListener = new UpdateListener<File>();
        updateListener.value = file;
        updateListener.registerListener(listener);
        this.files[file.id] = updateListener;
    }

    updateLocal(file: File) {
        const updateListener: UpdateListener<File> = this.files[file.id];
        updateListener.value = file;
    }
}

export const fileStore = new FileStore();

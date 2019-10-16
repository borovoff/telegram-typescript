export class UpdateListener<T> {
    listener = val => {};

    set value(val: T) {
        this.listener(val);
    }

    registerListener(listener) {
        this.listener = listener;
    }
}
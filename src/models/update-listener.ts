export class UpdateListener<T> {
    private _value;

    listener = val => {};

    set value(val: T) {
        this._value = val;
        this.listener(val);
    }

    get value(): T {
        return this._value;
    }

    registerListener(listener) {
        this.listener = listener;
    }
}
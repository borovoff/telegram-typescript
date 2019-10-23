export class UpdateListener<T> {
    private _value;

    listeners = [];

    set value(val: T) {
        this._value = val;
        this.listeners.forEach(l => l(val));
    }

    get value(): T {
        return this._value;
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }
}
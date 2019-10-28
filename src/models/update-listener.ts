export class UpdateListener<T> {
    private _value;

    listeners: ((val: T) => void)[] = [];

    set value(val: T) {
        this._value = val;
        this.listeners.forEach(l => l(val));
    }

    get value(): T {
        return this._value;
    }

    subscribe(listener: (val: T) => void) {
        this.listeners.push(listener);
    }
}
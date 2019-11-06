import {LoginPlaceholder} from "../../models/interface/login-placeholder";
import {InputType} from "../../models/interface/input-type";

export class FormComponent extends HTMLElement {
    caption: HTMLElement;
    input: HTMLInputElement;
    form: HTMLElement;

    constructor(placeholder: LoginPlaceholder, type: InputType) {
        super();

        this.form = this.create('form');
        this.appendChild(this.form);

        this.caption = this.createCaption(placeholder);
        this.form.appendChild(this.caption);

        this.input = this.create('input') as HTMLInputElement;
        this.input.type = type;
        this.input.placeholder = placeholder;
        this.form.appendChild(this.input);

        this.input.addEventListener('focus', () => {
            if (this.input.value) FormComponent.show(this.caption);
            this.caption.classList.add('focus-caption');
        });

        this.input.addEventListener('blur', () => {
            this.caption.classList.remove('focus-caption');
            if (!this.input.value) FormComponent.hide(this.caption);
        });

        this.input.addEventListener('input', () => {
            if (this.input.value)
                FormComponent.show(this.caption);
            else
                FormComponent.hide(this.caption);
        });

        this.form.addEventListener('submit', ev => ev.preventDefault());
    }

    setInvalid(caption: string) {
        this.caption.innerText = caption;
        this.caption.classList.add('invalid-caption');
        this.input.classList.add('invalid-input');
    }

    removeInvalid(caption: LoginPlaceholder) {
        if (this.caption.innerText !== caption)
            this.caption.innerText = caption;
        this.caption.classList.remove('invalid-caption');
        this.input.classList.remove('invalid-input');
    }

    static getIntCode(code: string) {
        return parseInt(code.replace(/\s/g, ''));
    };

    create(tag: string = 'div'): HTMLElement | HTMLImageElement | HTMLInputElement {
        return document.createElement(tag);
    }

    static show(element) {
        element.classList.remove('hide');
    }

    static hide(element) {
        element.classList.add('hide');
    }

    createCaption(text: string) {
        const caption = this.create();
        caption.innerText = text;
        caption.classList.add('caption', 'hide');

        return caption;
    }
}

customElements.define('tg-form', FormComponent);
import {LoginComponent} from "./login.component";
import {LOGIN_TEXT} from "../../models/interface/login-text";
import {FormComponent} from "./form.component";
import {LoginPlaceholder} from "../../models/interface/login-placeholder";
import {InputType} from "../../models/interface/input-type";
import {LoginButtonComponent} from "./login-button.component";
import {LoginButtonText} from "../../models/interface/login-button-text";
import {PhotoPickerComponent} from "./photo-picker.component";

export class RegistrationComponent extends LoginComponent {
    constructor() {
        super(LOGIN_TEXT.reg);

        const name = new FormComponent(LoginPlaceholder.Name, InputType.Text);
        this.appendChild(name);

        const input = name.input;
        input.autofocus = true;

        const lastName = new FormComponent(LoginPlaceholder.LastName, InputType.Text);
        this.appendChild(lastName);

        const start = new LoginButtonComponent(LoginButtonText.Start);
        this.appendChild(start);

        const photo = document.createElement('div');
        photo.classList.add('photo-preview');
        this.insertBefore(photo, this.firstChild);

        const avatar = document.createElement('img');
        photo.appendChild(avatar);

        const addPhoto = document.createElement('img');
        addPhoto.src = 'assets/cameraadd_svg.svg';
        addPhoto.classList.add('add-photo');
        photo.appendChild(addPhoto);

        const photoPicker = new PhotoPickerComponent();
        FormComponent.show(photoPicker);
        document.body.appendChild(photoPicker);

        photo.onclick = () => {
            FormComponent.show(photoPicker);
        };

        input.oninput = () => {
            if (input.value.length > 0)
                FormComponent.show(start.button);
            else
                FormComponent.hide(start.button);
        };

        start.button.onclick = () => this.register();

        [name, lastName].forEach(f => f.onsubmit = () => this.register());
    }

    register() {
        // TODO: add registration method
    }
}

customElements.define('tg-registration', RegistrationComponent);
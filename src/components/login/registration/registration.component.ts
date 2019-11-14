import {LoginComponent} from "../login.component";
import {LOGIN_TEXT} from "../../../models/interface/login-text";
import {FormComponent} from "../form.component";
import {LoginPlaceholder} from "../../../models/interface/login-placeholder";
import {InputType} from "../../../models/interface/input-type";
import {LoginButtonComponent} from "../login-button.component";
import {LoginButtonText} from "../../../models/interface/login-button-text";
import {PhotoPickerComponent} from "./photo-picker.component";
import {tdlib} from "../../../tdlib";

export class RegistrationComponent extends LoginComponent {
    constructor() {
        super(LOGIN_TEXT.reg);

        const name = new FormComponent(LoginPlaceholder.Name, InputType.Text);
        this.appendChild(name);

        const input = name.input;
        input.autofocus = true;

        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.style.display = 'none';
        inputFile.accept = 'image/*';
        this.appendChild(inputFile);

        const lastName = new FormComponent(LoginPlaceholder.LastName, InputType.Text);
        this.appendChild(lastName);

        const start = new LoginButtonComponent(LoginButtonText.Start);
        this.appendChild(start);

        const photo = document.createElement('div');
        photo.classList.add('photo-preview');
        this.insertBefore(photo, this.firstChild);

        const avatar = document.createElement('img');
        avatar.classList.add('main-avatar');
        photo.appendChild(avatar);

        const addPhoto = document.createElement('img');
        addPhoto.src = 'assets/cameraadd_svg.svg';
        addPhoto.classList.add('add-photo');
        photo.appendChild(addPhoto);

        const photoPicker = new PhotoPickerComponent();
        // FormComponent.show(photoPicker);
        document.body.appendChild(photoPicker);

        photo.onclick = () => {
            inputFile.value = '';
            inputFile.click();
        };

        input.oninput = () => {
            if (input.value.length > 0)
                FormComponent.show(start.button);
            else
                FormComponent.hide(start.button);
        };

        inputFile.onchange = () => {
            FormComponent.show(photoPicker);
            const file = inputFile.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                // @ts-ignore
                photoPicker.imgSrc.value = event.target.result;
            };

            reader.readAsDataURL(file);
        };

        photoPicker.check.onclick = () => {
            FormComponent.hide(photoPicker);
            avatar.src = photoPicker.imgSrc.value;

            const scale = photoPicker.getScale(avatar, photo);

            const x = scale * photoPicker.translateValue.x / photoPicker.scale;
            const y = scale * photoPicker.translateValue.y / photoPicker.scale;

            avatar.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        };

        start.button.onclick = () => {
            this.register(input.value, lastName.input.value);
        };

        [name, lastName].forEach(f => f.onsubmit = () => {
            const nameValue = input.value;
            if (nameValue.length > 0) {
                this.register(nameValue, lastName.input.value);
            }
        });
    }

    register(firstName: string, lastName?: string) {
        tdlib.registerUser(firstName, lastName);
    }
}

customElements.define('tg-registration', RegistrationComponent);
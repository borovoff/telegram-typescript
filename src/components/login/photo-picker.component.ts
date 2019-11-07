import {FormComponent} from "./form.component";

export class PhotoPickerComponent extends HTMLElement {
    constructor() {
        super();

        this.classList.add('hide', 'cancel-area');

        const cancelArea = document.createElement('div');
        cancelArea.classList.add('photo-picker');
        this.appendChild(cancelArea);

        const rect = document.createElement('div');
        rect.classList.add('avatar-rect');
        cancelArea.appendChild(rect);

        const img = document.createElement('img');
        img.src = 'https://foliotek.github.io/Croppie/demo/demo-1.jpg';
        img.classList.add('avatar-img');

        const round = document.createElement('div');
        round.classList.add('avatar-round');
        rect.appendChild(round);

        const setTransform = () => {
            img.style.transform = `translate(${translate.x}px, ${translate.y}px) scale(${scale})`;
        };

        const zoomTick = 0.01;
        const maxZoom = 1.5;


        let scale = 1;
        let translate = {x: 0, y: 0};

        const height = 1280;//img.offsetHeight;
        const width = 720;//img.offsetWidth;


        setTimeout(() => {
            scale = rect.offsetWidth / (height > width ? width : height);
            setTransform();
            rect.appendChild(img);
        });


        rect.onwheel = ev => {
            ev.preventDefault();

            if (ev.deltaY < 0 && scale <= maxZoom) {
                scale += zoomTick;
            } else if (ev.deltaY > 0 && (scale * img.offsetHeight) >= rect.offsetHeight && (scale * img.offsetWidth) >= rect.offsetWidth) {
                scale -= zoomTick;
            }

            setTransform()
        };

        let mouseDown = false;
        let cursorPosition = {x: 0, y: 0};

        rect.onmousedown = ev => {
            ev.preventDefault();
            mouseDown = true;
            cursorPosition = {x: ev.clientX, y: ev.clientY};
            this.classList.add('cancel-area-grab');
        };

        this.onmouseup = ev => {
            setTimeout(() => mouseDown = false, 0);
            this.classList.remove('cancel-area-grab');
        };

        this.onmousemove = ev => {
            if (mouseDown) {
                const deltaX = ev.clientX - cursorPosition.x;
                const deltaY = ev.clientY - cursorPosition.y;

                translate = {x: translate.x += deltaX, y: translate.y += deltaY};

                cursorPosition = {x: ev.clientX, y: ev.clientY};

                setTransform();
            }
        };

        this.onclick = (ev: MouseEvent) => {
            if (ev.target === this && !mouseDown) {
                FormComponent.hide(this);
            }
        };
    }
}

customElements.define('tg-photo-picker', PhotoPickerComponent);
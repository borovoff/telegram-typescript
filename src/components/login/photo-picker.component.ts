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
        const shift = {height: 0, width: 0};

        let scale = 1;
        let translate = {x: 0, y: 0};

        const width = 1280;//img.offsetHeight;
        const height = 720;//img.offsetWidth;

        rect.appendChild(img);

        setTimeout(() => {
            if (height > width) {
                shift.height = (height - width) / 2;
                scale = rect.offsetWidth / width;
                translate.y = - scale * shift.height;
            } else {
                shift.width = (width - height) / 2;
                scale = rect.offsetWidth / height;
                translate.x = - scale * shift.width;
            }

            setTransform();
            rect.appendChild(img);
        });


        rect.onwheel = (ev: WheelEvent) => {
            ev.preventDefault();

            console.log(ev);

            let multiplier = 0;
            if (ev.deltaY < 0 && scale <= maxZoom) {
                multiplier = 1;
            } else if (ev.deltaY > 0 &&
                (scale * img.offsetHeight) >= rect.offsetHeight &&
                (scale * img.offsetWidth) >= rect.offsetWidth) {
                multiplier = - 1;
            }

            scale += multiplier * zoomTick;

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

        this.onmouseup = () => {
            setTimeout(() => mouseDown = false);
            this.classList.remove('cancel-area-grab');
        };

        this.onmousemove = ev => {
            if (mouseDown) {
                const deltaX = ev.clientX - cursorPosition.x;
                const deltaY = ev.clientY - cursorPosition.y;

                const x = translate.x + deltaX;
                const y = translate.y + deltaY;

                if (x < 0 && (x + scale * img.offsetWidth) > rect.offsetWidth)
                    translate.x = x;
                if (y < 0 && (y + scale * img.offsetHeight) > rect.offsetHeight)
                    translate.y = y;

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
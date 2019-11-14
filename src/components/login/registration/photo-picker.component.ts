import {FormComponent} from "../form.component";
import {UpdateListener} from "../../../models/update-listener";
import {Point} from "../../../models/interface/point";

export class PhotoPickerComponent extends HTMLElement {
    imgSrc: UpdateListener<string> = new UpdateListener();
    check: HTMLButtonElement;
    translateValue: Point = {x: 0, y: 0};
    scale: number;

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
        img.classList.add('avatar-img');

        const round = document.createElement('div');
        round.classList.add('avatar-round');
        rect.appendChild(round);

        this.check = document.createElement('button');
        this.check.classList.add('check-picker');
        cancelArea.appendChild(this.check);

        const checkImg = document.createElement('img');
        checkImg.src = 'assets/check_svg.svg';
        this.check.appendChild(checkImg);

        const close = document.createElement('img');
        close.src = 'assets/close_svg.svg';
        close.classList.add('close-picker');
        cancelArea.appendChild(close);

        const caption = document.createElement('h4');
        caption.innerText = 'Drag to Reposition';
        caption.classList.add('picker-caption');
        cancelArea.appendChild(caption);

        const setTransform = () => {
            // img.style.transformOrigin = transformOrigin.x + 'px ' + transformOrigin.y + 'px';
            img.style.transform = `translate(${this.translateValue.x}px, ${this.translateValue.y}px) scale(${this.scale})`;
        };

        const zoomTick = 0.01;
        const maxZoom = 1.5;
        let transformOrigin = {x: 0, y: 0};

        this.imgSrc.subscribe(s => {
            rect.appendChild(img);
            img.src = s;

            const width = img.offsetWidth;
            const height = img.offsetHeight;

            this.scale = this.getScale(img, rect);

            this.translateValue.x = - this.scale * width / 2 + rect.offsetHeight / 2;
            this.translateValue.y = - this.scale * height / 2 + rect.offsetWidth / 2;

            setTransform();
        });

        rect.onwheel = (ev: WheelEvent) => {
            ev.preventDefault();

            // let multiplier = 0;
            // if (ev.deltaY < 0 && scale <= maxZoom) {
            //     multiplier = 1;
            // } else if (ev.deltaY > 0 &&
            //     (scale * img.offsetHeight) >= rect.offsetHeight &&
            //     (scale * img.offsetWidth) >= rect.offsetWidth) {
            //     multiplier = - 1;
            // }
            //
            // scale += multiplier * zoomTick;
            //
            // setTransform()
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

                const x = this.translateValue.x + deltaX;
                const y = this.translateValue.y + deltaY;

                if (x < 0 && (x + this.scale * img.offsetWidth) > rect.offsetWidth)
                    this.translateValue.x = x;
                if (y < 0 && (y + this.scale * img.offsetHeight) > rect.offsetHeight)
                    this.translateValue.y = y;

                cursorPosition = {x: ev.clientX, y: ev.clientY};

                setTransform();
            }
        };

        close.onclick = () => FormComponent.hide(this);

        this.onclick = (ev: MouseEvent) => {
            if (ev.target === this && !mouseDown) {
                FormComponent.hide(this);
            }
        };
    }

    getScale(img: HTMLImageElement, rect: HTMLElement): number {
        const width = img.offsetWidth;
        const height = img.offsetHeight;

        return rect.offsetWidth / (height > width ? width : height);
    }
}

customElements.define('tg-photo-picker', PhotoPickerComponent);
import {Tdlib} from "../tdlib";
import {LeftColumnComponent} from "./left-column/left-column.component";
import {RightColumnComponent} from "./right-column.component";

export class MainComponent extends HTMLElement {
    constructor(private tdlib: Tdlib) {
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: fixed;
                display: flex;
                height: 100vh;
            }
        </style><slot></slot>`;

        document.body.appendChild(this);
        new LeftColumnComponent(this.tdlib, this);
        new RightColumnComponent(this.tdlib, this);
        this.renderLogOut();
    }

    renderLogOut() {
        const button = document.createElement('button');
        button.innerText = 'logout';
        button.addEventListener('click', _ => this.tdlib.logout());
        // this.shadowRoot.appendChild(button);
    }
}

customElements.define('tg-main', MainComponent);
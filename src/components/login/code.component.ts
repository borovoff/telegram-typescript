import lottie from 'lottie-web';
import {LoginMonkey} from "../../models/interface/login-monkey";
import {UpdateAuthorizationState} from "../../models/auth/update-authorization-state";

export class CodeComponent extends HTMLElement {
    constructor(update: UpdateAuthorizationState) {
        super();

        console.log(update);

        this.render();
    }

    render() {
        // fetch('assets/TwoFactorSetupMonkeyClose.tgs')
        //     .then(response => response.text())
        //     .then(text => console.log(JSON.parse(text)));

        lottie.loadAnimation({
            container: this, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/' + LoginMonkey.Idle // the path to the animation json
        });

        this.innerHTML = ``;
    }
}

customElements.define('tg-code', CodeComponent);
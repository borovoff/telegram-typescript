import lottie from 'lottie-web';

export class CodeComponent extends HTMLElement {
    constructor() {
        super();

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
            path: 'assets/close.json' // the path to the animation json
        });

        this.innerHTML = ``;
    }
}

customElements.define('tg-code', CodeComponent);
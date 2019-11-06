import {LoginComponent} from "./login.component";
import lottie from "lottie-web";
import {LoginText} from "../../models/interface/login-text";

export class MonkeyComponent extends LoginComponent {
    animationContainer: HTMLElement;

    constructor(animationName: string, text?: LoginText) {
        super(text);

        this.animationContainer = this.create();
        this.insertBefore(this.animationContainer, this.firstChild);
        this.loadAnimation(animationName)
    }

    loadAnimation(animationName: string) {
        while (this.animationContainer.firstChild)
            this.animationContainer.firstChild.remove();

        lottie.loadAnimation({
            container: this.animationContainer, // the dom element that will contain the animation
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: 'assets/' + animationName // the path to the animation json
        });
    }
}
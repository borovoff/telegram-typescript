import {LoginComponent} from "./login.component";
import {LoginText} from "../../models/interface/login-text";
import lottie from "lottie-web";
import {LoginMonkey} from "../../models/interface/login-monkey";


export class MonkeyComponent extends LoginComponent {
    animationContainer: HTMLElement;
    lottie;

    constructor(animationNames: LoginMonkey[], text?: LoginText) {
        super(text);

        import(/* webpackPrefetch: true */ "lottie-web").then(lottie => {
            this.lottie = lottie;
            // this.loadAnimation(animationNames);
        });

        this.animationContainer = this.create();
        this.animationContainer.classList.add('monkey-face');
        this.insertBefore(this.animationContainer, this.firstChild);
    }
}
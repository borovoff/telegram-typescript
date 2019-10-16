import {TdlibType} from '../tdlib-type';

export class FormattedText extends TdlibType {
    entities: any[];
    text: string;

    constructor(text: string, entities: any[] = null) {
        super('formattedText');

        this.text = text;
        this.entities = entities;
    }
}

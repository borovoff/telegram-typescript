import {TdParameters} from './td-parameters';
import {TdlibType} from './tdlib-type';

export class SetTdlibParameters extends TdlibType {
    parameters: TdParameters;

    constructor(parameters: TdParameters) {
        super();
        this['@type'] = 'setTdlibParameters';

        this.parameters = parameters;
    }
}

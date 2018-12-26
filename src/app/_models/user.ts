export class User {
    id: number;
    username: string = "";
    password: string = "";
    name: string = "";
    passwordReset: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
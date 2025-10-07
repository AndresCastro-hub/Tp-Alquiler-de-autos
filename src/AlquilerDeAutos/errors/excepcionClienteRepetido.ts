export default class ErrorClienteRepetido extends Error {
    constructor(message: string){
        super(message);
    }
}
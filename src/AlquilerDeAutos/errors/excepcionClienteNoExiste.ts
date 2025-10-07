export default class ErrorClienteNoExiste extends Error {
    constructor(message: string){
        super(message);
    }
}
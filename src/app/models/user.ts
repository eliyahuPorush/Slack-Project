export class User {

    constructor(private idToken:string, 
        private email: string, 
        private displayName:string, 
        private localId: string, 
        private refreshToken: string, 
        private expiresIn: string , 
        private registered?: boolean ){}
}

import bcrypt from 'bcrypt';
import User from '../domain/user.entity';

class RegisterUserUseCase {
    constructor(userRepositoty) {
        this.userRepositoty = userRepositoty;
    }

    async excecute({ username, password }){
        const existingUser = await this.userRepositoty.findByUsername(username);
        if(existingUser) throw new Error("User already exists");

        const passwordHash = await bcrypt.hash(password, 12);
        const user = new User({username, passwordHash});
        return await this.userRepositoty.createUser(user);
    }
}

module.exports = RegisterUserUseCase;
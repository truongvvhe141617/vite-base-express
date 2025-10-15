import bcrypt from 'bcrypt'
import TokenService from '../infrastructure/token.service'

class LoginUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({ username, password }) {
        const user = await this.userRepository.findByUserName(username);
        if(!user) throw new Error("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if(!isPasswordValid) throw new Error("Invalid password");

        const payload = { userId: user.id, username: user.username};
        const accessToken = TokenService.generateAccessToken(payload);
        const refreshToken = TokenService.generateRefreshToken(payload);

        await this.userRepository.updateRefreshToken(user.id, refreshToken);

        return { accessToken, refreshToken };
    }
}

module.exports = LoginUserUseCase;
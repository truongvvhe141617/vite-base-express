import TokenService from '../infrastructure/token.service'

class RefreshTokenUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(refreshToken) {
        if(!refreshToken) throw new Error("Missing refresh token");
        const decoded = TokenService.verifyRefreshToken(refreshToken);
        const user = await this.userRepository.findById(decoded.userId);
        if(!user) throw new Error("User not found");

        const newAccessTken = TokenService.generateAccessToken({
            userId: user.id,
            username: user.username
        })

        return { accessToken: newAccessTken }
    }
}

module.exports = RefreshTokenUseCase;
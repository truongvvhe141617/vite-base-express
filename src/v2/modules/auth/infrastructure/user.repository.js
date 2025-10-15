import UserModel from './user.model';
import User from '../domain/user.entity';

class UserRepository {
    async findByUserName(username) {
        const user = await UserModel.findOne({ where: {username} });
        return user ? new User(user) : null;
    }

    async findById(id) {
        const user = await UserModel.findByPk(id);
        return user ? new User(user) : null;
    }

    async createUser(userEntity) {
        const user = await UserModel.create({
            username: userEntity.username,
            passwordHash: userEntity.passwordHash
        });
        return new User(user);
    }

    async updateRefreshToken(id, refreshToken) {
        await UserModel.update({ refreshToken }, { where: { id } });
    }
}

module.exports = UserRepository;
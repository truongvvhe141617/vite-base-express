import  UserRepository from ("../infrastructure/user.repository");
import RegisterUserUseCase  from ("../application/register-user.usecase");
import LoginUserUseCase from ("../application/login-user.usecase");
import RefreshTokenUseCase from ("../application/refresh-token.usecase");
import { successResponse, errorResponse } from ("../../../shared/utils/response");

const userRepository = new UserRepository();

exports.register = async (req, res) => {
  try {
    const useCase = new RegisterUserUseCase(userRepository);
    const user = await useCase.execute(req.body);
    return successResponse(res, user, "User registered successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

exports.login = async (req, res) => {
  try {
    const useCase = new LoginUserUseCase(userRepository);
    const tokens = await useCase.execute(req.body);
    return successResponse(res, tokens, "Login successful");
  } catch (err) {
    return errorResponse(res, err.message, 401);
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const useCase = new RefreshTokenUseCase(userRepository);
    const tokens = await useCase.execute(req.body.refreshToken);
    return successResponse(res, tokens, "Access token refreshed");
  } catch (err) {
    return errorResponse(res, err.message, 401);
  }
};

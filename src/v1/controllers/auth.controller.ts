import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import apiKeyService from "../services/apiKey.service";
class Controller {
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        
        const existedUser = await User.findOne({ email });

        if(!existedUser) {
            res.status(500).json({
                message: 'User is not found!',
                status: 'error'
            });
            return;
        }
        const passwordExact = bcrypt.compare(password, existedUser.password)

        const accessToken = await apiKeyService.signApiKeyToken(existedUser);

        if(!passwordExact) {
            res.status(500).json({
               message: 'Wrong password!',
                status: 'error'
            })
        } else {
            res.status(200).json({
                message: 'Login Success!',
                data: {
                    accessToken,
                },
                status: 'success'
            })
        }
        
    }
    getUserDetail = async (req: Request, res: Response) => {
        const existedUser = await User.findOne({ _id: req.params.id });
        if (!existedUser) {
        res.status(500).json({
            message: "User is not found",
            status: "error",
        });
        return;
        }

        res.status(200).json({
        message: "Get detail user success",
        data: {
            ...existedUser,
        },
        status: "success",
        });
    };
    register = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existedUser = await User.findOne({ email });

        if(existedUser) {
            res.status(500).json({
                message: 'User is existed!',
                status: 'error'
            });
            return;
        }
        const passwordEndcryted = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            password: passwordEndcryted
        });

        await user.save();
        
        res.status(200).json({
            message: 'User registed successfully!',
            status: 'success'
        });
    }
}

const controller = new Controller();
export default controller;
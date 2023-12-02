import { Request, Response } from "express";
import User from "../models/user.model";
import { generateRandomString } from "../../../helpers/generate";
import md5 from "md5"

export const register = async (req: Request, res: Response) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });
    if (existEmail) {
        res.json({
            code: 400,
            message: "Email đã tồn tại!"
        });
    } else {
        const newUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: md5(req.body.password),
            token: generateRandomString(30)
        };
        const user = new User(newUser);
        const data = await user.save();
        const token = data.token;
        res.cookie("token", token)

        res.json({
            code: 200,
            message: "Tạo tài khoản thành công!",
            token: token
        })
    }

}

export const login = async (req: Request, res: Response) => {
    const email: string = req.body.email
    const password: string = req.body.password

    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if (!user) {
        res.status(400).json({
            code: 400,
            message: "Email không tồn tại"
        }
        )
        return
    }
    if (md5(password) !== user.password) {
        res.status(400).json({
            code: 400,
            message: "Sai mật khẩu!"
        }
        )
        return
    }
    const token = user.token
    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: token
    })
}

export const detail = async (req: Request, res: Response) => {
    res.json({
        code:200,
        message: "Thành công",
        info: req["inforUser"]
    })
}


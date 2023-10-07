import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-local";
import User from "../../../models/user.model.js"
import is_form_ok from "../../../middlewares/is_form_ok.js";
import is_8_char from "../../../middlewares/is_8_char.js";
import is_valid_user from "../../../middlewares/is_valid_user.js";
import create_token from "../../../middlewares/create_token.js";
import is_valid_pass from "../../../middlewares/is_valid_pass.js";

const router = Router();

router.post('/register', is_form_ok, is_8_char, async(req,res,next) => {
    try {
        let one = await User.create(req.body);
        return res.status(201).json({
            success:true,
            message: 'User registered',
            user_id: one._id
        });
    } catch (error) {
        next(error);
    };
});

router.post(
    "/login",
    is_8_char,
    passport.authenticate("login"),
    create_token,
    async (req, res, next) => {
      try {
        req.session.mail = req.body.mail;
        req.session.role = req.user.role;
        return res
          .status(200)
          .cookie("token", req.session.token, {
            maxAge: 60 * 60 * 24 * 7 * 1000,
            httpOnly: true,
          })
          .json({
            status: 200,
            user: req.user,
            response: req.session.mail + " inicio sesión",
            token: req.session.token,
          });
      } catch (error) {
        next(error);
      }
    }
  );

router.get('/signout', passport.authenticate('jwt'), async (req,res,next) => {
    try {
        req.session.destroy()
        return res.status(200).clearCookie('token').json({
            success: true,
            message: 'sesion cerrada',
            dataSession: req.session
        });
    } catch (error) {
        next(error);
    };
});

router.get('/github', passport.authenticate('github', {scope: ['user:mail']}),(req,res)=>{})
router.get('/github/callback', passport.authenticate('github',{}),(req,res,next) => { 
    try {
        req.session.mail = req.user.mail;
        req.session.mail = req.user.role;
        return res.status(200).json({
            success:true,
            user:req.user
        });
    } catch (error) {
        next(error);
    }
});

export default router;
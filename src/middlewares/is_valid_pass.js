import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export default async function (req,res,next) {
    //comparo las contrasenas
    let password_from_form = req.body.password_from_form
    let user = await User.find({ mail:req.body.mail})
    let password_hash = user.password
    let verified = bcrypt.compareSync(password_from_form,password_hash)
    //el booleano que re sulte de la comparacion
    //se utiliza pra condicionar si dejo pasar o no.
    if (verified) {
        return next()
    } else {
        return res.status(401).json({
            status: 401,
            method: req.method,
            path: req.url,
            response: 'invalid credentials'
        });
    }
}
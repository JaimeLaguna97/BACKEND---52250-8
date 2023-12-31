import {Router} from "express";

const cookies_router = Router();

cookies_router.get('/set', (req,res,next) =>{
    try {
        return res.status(200).cookie(
            'clave',
            'valor, con lo que quieran',
            { maxAge:30000, }    
        ).json({
            success: true,
            message: 'cookie seteada'
        });
    } catch (error){
        next(error)
    }
});

cookies_router.get('/read', (req,res,next) => {
    try {
        return res.status(200).json(req.signedCookies);
    } catch (error) {
        next(error)
    }
});

cookies_router.get('/clear', (req,res,next) => {
    try {
        return res.status(200).clearCookie('clave').json ({
            success: true,
            message: 'Cookie borrada',
            evidence: req.cookies
        })
    } catch (error) {
        next(error)
    }
});

export default cookies_router;
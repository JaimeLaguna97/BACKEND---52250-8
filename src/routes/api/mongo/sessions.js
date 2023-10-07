import { Router } from "express";

const sessions_router = Router();

sessions_router.get('/get', (req,res,next) => { 
    try {
            return res.status(200).json(req.session);
    }   catch (error) {
        next(error)
    }
});

sessions_router.get('/counter', async (req,res) => {
    if (!req.session.counter) { req.session.counter = 1 }
    else { req.session.counter++ }
    return res.status(200).json({message: `Han ingresado ${req.session.counter} usuarios`});
});

export default sessions_router;
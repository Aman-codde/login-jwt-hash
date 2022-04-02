import express, { NextFunction, Request, Response } from "express";

const apiRouter = express.Router();


// routes go here



// response handler
apiRouter.use((req, res, next) => {
    if(res.locals.data) {
        res.status(200).json({data: res.locals.data})
    }
    else {
        next();
    }
});

// express error handling middleware
apiRouter.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err.name == "ValidationError") {
        res.status(400).send(err);
    }
});

apiRouter.all('/*', function(req,res){
    console.log("Not Found");
    res.sendStatus(404);
})
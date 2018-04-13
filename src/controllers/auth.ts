import { Express, Request, Response, Router } from 'express';

const authRouter: Router = Router();

authRouter.get( '/microsoft', ( req: Request, res: Response ) => {
  res.send( 'Authing!' );
  console.log( 'Authing ' );
} );

export default authRouter;

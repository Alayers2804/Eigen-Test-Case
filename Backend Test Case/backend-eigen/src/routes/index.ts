import { Router } from 'express';

import Paths from '../common/Paths';
import UserRoutes from './UserRoutes';
import BookRoutes from './BookRoutes';
import BorrowRoutes from "./BorrowRoutes";

/******************************************************************************
                                Variables
******************************************************************************/

const apiRouter = Router();


const userRouter = Router();

// Define user routes
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);


apiRouter.use(Paths.Users.Base, userRouter);

const bookRouter = Router();

bookRouter.get(Paths.Books.Get, BookRoutes.getAll);
bookRouter.post(Paths.Books.Add, BookRoutes.add);
bookRouter.put(Paths.Books.Update, BookRoutes.update);
bookRouter.delete(Paths.Books.Delete, BookRoutes.delete);

apiRouter.use(Paths.Books.Base, bookRouter);

apiRouter.use("/management", BorrowRoutes);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;

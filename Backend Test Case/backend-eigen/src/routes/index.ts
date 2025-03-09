import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import Paths from "../common/Paths";
import UserRoutes from "./UserRoutes";
import BookRoutes from "./BookRoutes";
import BorrowRoutes from "./BorrowRoutes";

/******************************************************************************
                                Swagger Setup
******************************************************************************/

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management API",
      version: "1.0.0",
      description: "API documentation for the Library Management System",
    },
    servers: [{ url: "http://localhost:3000/api" }],
  },
  apis: ["./src/routes/*.ts"], // Ensure this path is correct
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

/******************************************************************************
                                Variables
******************************************************************************/

const apiRouter = Router();

// Swagger documentation route
apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/******************************************************************************
                                User Routes
******************************************************************************/

const userRouter = Router();
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

apiRouter.use(Paths.Users.Base, userRouter);

/******************************************************************************
                                Book Routes
******************************************************************************/

const bookRouter = Router();
bookRouter.get(Paths.Books.Get, BookRoutes.getAll);
bookRouter.post(Paths.Books.Add, BookRoutes.add);
bookRouter.put(Paths.Books.Update, BookRoutes.update);
bookRouter.delete(Paths.Books.Delete, BookRoutes.delete);

apiRouter.use(Paths.Books.Base, bookRouter);

/******************************************************************************
                                Borrow Routes
******************************************************************************/

apiRouter.use("/management", BorrowRoutes);

/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;

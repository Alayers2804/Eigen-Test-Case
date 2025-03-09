import { Router } from "express";
import BorrowService from "@src/services/BorrowService";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

const borrowRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: API endpoints for borrowing and returning books
 */

/**
 * @swagger
 * /management/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberCode
 *               - bookCode
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: "M001"
 *               bookCode:
 *                 type: string
 *                 example: "B101"
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error occurred while borrowing the book
 */
borrowRouter.post("/borrow", async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    await BorrowService.borrowBook(memberCode, bookCode);
    res.status(HttpStatusCodes.OK).json({ message: "Book borrowed successfully!" });
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

/**
 * @swagger
 * /management/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - memberCode
 *               - bookCode
 *             properties:
 *               memberCode:
 *                 type: string
 *                 example: "M001"
 *               bookCode:
 *                 type: string
 *                 example: "B101"
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Error occurred while returning the book
 */
borrowRouter.post("/return", async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    await BorrowService.returnBook(memberCode, bookCode);
    res.status(HttpStatusCodes.OK).json({ message: "Book returned successfully!" });
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

/**
 * @swagger
 * /management/books:
 *   get:
 *     summary: Get all available books
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: A list of available books
 *       400:
 *         description: Error fetching books
 */
borrowRouter.get("/books", async (req, res) => {
  try {
    const books = await BorrowService.getAvailableBooks();
    res.status(HttpStatusCodes.OK).json(books);
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

/**
 * @swagger
 * /management/members:
 *   get:
 *     summary: Get all members with borrowed books
 *     tags: [Borrowing]
 *     responses:
 *       200:
 *         description: A list of members and their borrowed book count
 *       400:
 *         description: Error fetching members
 */
borrowRouter.get("/members", async (req, res) => {
  try {
    const members = await BorrowService.getMembersWithBorrowedBooks();
    res.status(HttpStatusCodes.OK).json(members);
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ error: error.message });
  }
});

export default borrowRouter;

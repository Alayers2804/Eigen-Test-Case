import { Router } from "express";
import BorrowService from "@src/services/BorrowService";

const borrowRouter = Router();

borrowRouter.post("/borrow", async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    await BorrowService.borrowBook(memberCode, bookCode);
    res.status(200).json({ message: "Book borrowed successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

borrowRouter.post("/return", async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    await BorrowService.returnBook(memberCode, bookCode);
    res.status(200).json({ message: "Book returned successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

borrowRouter.get("/books", async (req, res) => {
  const books = await BorrowService.getAvailableBooks();
  res.status(200).json(books);
});

borrowRouter.get("/members", async (req, res) => {
  const members = await BorrowService.getMembersWithBorrowedBooks();
  res.status(200).json(members);
});

export default borrowRouter;

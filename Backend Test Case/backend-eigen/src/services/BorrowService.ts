import BorrowRepo from '@src/repos/BorrowRepo';
import MemberRepo from '@src/repos/UserRepo';
import BookRepo from '@src/repos/BookRepo';

async function borrowBook(member_code: string, book_code: string): Promise<void> {
  // Verify if the member exists
  if (!(await MemberRepo.persists(member_code))) {
    throw new Error('Member does not exist.');
  }

  // Fetch book details
  const book = await BookRepo.getOne(book_code);
  if (!book) {
    throw new Error('Book does not exist.');
  }

  // Check if the member has already borrowed 2 books
  if (await BorrowRepo.countBooksBorrowed(member_code) >= 2) {
    throw new Error('Member cannot borrow more than 2 books.');
  }

  // Check if the book is currently borrowed by another member
  if (await BorrowRepo.isBookBorrowed(book_code)) {
    throw new Error('Book is currently borrowed by another member.');
  }

  // Check if the member is penalized
  if (await BorrowRepo.isMemberPenalized(member_code)) {
    throw new Error('Member is penalized and cannot borrow books.');
  }

  // Proceed with borrowing
  await BorrowRepo.add({
    member_code,
    book_code,
    borrow_date: new Date(),
    return_date: null,
    penalty_until: null,
  });

  // Decrease stock if stock is available
  if (book.stock > 0) {
    await BookRepo.update({ ...book, stock: book.stock - 1 });
  }
}

async function returnBook(member_code: string, book_code: string): Promise<void> {
  // Verify if the member exists
  if (!(await MemberRepo.persists(member_code))) {
    throw new Error('Member does not exist.');
  }

  // Fetch book details
  const book = await BookRepo.getOne(book_code);
  if (!book) {
    throw new Error('Book does not exist.');
  }

  // Fetch borrowed records for the member
  const records = await BorrowRepo.getByMember(member_code);
  const borrowRecord = records.find(r => r.book_code === book_code && !r.return_date);

  // Check if the book was actually borrowed by the member
  if (!borrowRecord) {
    throw new Error('This book was not borrowed by the member.');
  }

  // Calculate return date and penalty (if overdue)
  const returnDate = new Date();
  const borrowDate = borrowRecord.borrow_date;
  const penaltyUntil = borrowDate && (returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24) > 7
    ? new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000)
    : null;

  // Update the borrow record
  await BorrowRepo.update({
    uid: borrowRecord.uid,
    return_date: returnDate,
    penalty_until: penaltyUntil,
  });

  // Increase stock when the book is returned
  await BookRepo.update({ ...book, stock: book.stock + 1 });
}

async function getAvailableBooks(): Promise<any[]> {
  return await BorrowRepo.getAvailableBooks();
}

async function getMembersWithBorrowedBooks(): Promise<any[]> {
  return await BorrowRepo.getMembersWithBorrowedBooks();
}

export default {
  borrowBook,
  returnBook,
  getAvailableBooks,
  getMembersWithBorrowedBooks,
} as const;

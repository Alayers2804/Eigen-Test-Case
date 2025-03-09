import BorrowRepo from '@src/repos/BorrowRepo';
import MemberRepo from '@src/repos/MemberRepo';
import BookRepo from '@src/repos/BookRepo';

async function borrowBook(member_code: string, book_code: string): Promise<void> {
    // Verify if the member exists
    if (!(await MemberRepo.persists(member_code))) {
        throw new Error('Member does not exist.');
    }

    // Check if the member is penalized
    if (await BorrowRepo.isMemberPenalized(member_code)) {
        throw new Error('Member is penalized and cannot borrow books.');
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

    // Proceed with borrowing
    await BorrowRepo.add({
        member_code,
        book_code,
        borrow_date: new Date(),
        return_date: null,
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

    // Calculate return date
    // const returnDate = new Date();
    const returnDate = new Date('2025-03-18T13:17:39'); // For testing purposes
    const borrowDate = borrowRecord?.borrow_date;
    if (!borrowDate) {
        throw new Error('Borrow date is missing.');
    }

    // Determine if the member should be penalized (if overdue > 7 days)
    const overdueDays = (returnDate.getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24);
    if (overdueDays > 7) {
        await MemberRepo.penalizeMember(member_code, returnDate); // Pass returnDate for penalty calculation
    }

    // Update the borrow record
    await BorrowRepo.update({
        uid: borrowRecord.uid,
        return_date: returnDate,
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

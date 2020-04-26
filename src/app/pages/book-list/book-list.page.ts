import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
})
export class BookListPage implements OnInit {

  public books: Book[];
  public state: string;

  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.getAllBooks();
  }

  public ionViewWillEnter(): void {
    this.getAllBooks();
  }

  private getAllBooks(): void {
    this.state = 'loading';

    this.booksService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
        this.state = 'loaded';
      },
      (error) => {
        this.state = 'error';
      }
    );
  }

  public reloadBooks(): void {
    this.getAllBooks();
  }
}

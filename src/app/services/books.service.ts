import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private booksPath = 'books';

  constructor(private httpClient: HttpClient) { }

  public getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(
      `${environment.apiUrl}/${this.booksPath}`
    );
  }

  public getBook(id: number): Observable<Book> {
    return this.httpClient.get<Book>(
      `${environment.apiUrl}/${this.booksPath}/${id}`
    );
  }

  public updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(
      `${environment.apiUrl}/${this.booksPath}/${book.id}`, book
    );
  }

  public createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(
      `${environment.apiUrl}/${this.booksPath}`, book
    );
  }

  public deleteBook(id: number): Observable<Book> {
    return this.httpClient.delete<Book>(
      `${environment.apiUrl}/${this.booksPath}/${id}`
    );
  }
}

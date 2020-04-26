import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-new',
  templateUrl: './book-new.page.html',
  styleUrls: ['./book-new.page.scss'],
})
export class BookNewPage implements OnInit {

  public state: string;
  public sendForm: boolean;
  public book: Book = {} as Book;
  public form: FormGroup;

  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
    this.state = 'loading';
    this.sendForm = false;
    this.complexFormInitialization();
  }

  private complexFormInitialization(): void {

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      language: ['', Validators.required],
      edition: ['', Validators.required],
      publisher: ['', Validators.required],
    });
  }

  public submitForm() {
    this.booksService.createBook(this.form.value).subscribe(
      (book: Book) => {
        this.router.navigateByUrl('books');
        this.presentToast('Book created successfully.');
      },
      (error) => {
        this.router.navigateByUrl('books');
        this.presentToast('Error ' + error.statusText);
      }
    );
  }

  public async presentToast(message: string) {
    const toast = await this.toastController.create({
      header: 'Books',
      message: message,
      duration: 3000
    });
    toast.present();
  }
}

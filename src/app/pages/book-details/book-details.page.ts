import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

  public state: string;
  public sendForm: boolean;
  public book: Book = {} as Book;
  public form: FormGroup;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController,
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

    this.booksService.getBook(
      +this.route.snapshot.paramMap.get('id')).subscribe(
        (book: Book) => {
          this.book = book;
          this.state = 'loaded';
          this.form.patchValue(this.book);
        },
        (error) => {
          this.state = 'error';
        }
    );
  }

  public reloadBook(): void {
    this.state = 'loading';
    this.complexFormInitialization();
  }

  public submitForm(): void {

    const bookToEdit = this.form.value;
    bookToEdit.id = this.book.id;

    this.sendForm = true;
    this.booksService.updateBook(this.form.value).subscribe(
      (book: Book) => {
        this.book = book;
        this.form.patchValue(this.book);
        this.sendForm = false;
        this.presentToast('Successfully edited book.');
      },
      (error) => {
        this.sendForm = false;
        this.state = 'error';
        this.presentToast(error.statusText);
      }
    );
  }

  public async deleteBook(id: number) {
    const alert = await this.alertController.create({
      header: 'Book deletion confirmation',
      message: 'Are you sure want to delete this book?',
      buttons: [
        {
          text: 'Disagree',
          role: 'cancel',
          handler: (blah) => {}
        },
        {
          text: 'Agree',
          handler: () => {
            this.booksService.deleteBook(id).subscribe(
              (book: Book) => {
                this.router.navigateByUrl('books');
                this.presentToast('Successfully deleted book.');
              },
              (error) => {
                this.state = 'error';
                this.sendForm = false;
                this.presentToast('Failed to delete. ' + error.statusText);
              }
            );
          }
        }
      ]
    });

    await alert.present();
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

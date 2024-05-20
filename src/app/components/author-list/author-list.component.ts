import { Component, OnInit,forwardRef } from '@angular/core';
import { Author } from '../../models/author.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorListComponent),
      multi: true
    }
  ]
})
export class AuthorListComponent implements OnInit, ControlValueAccessor {
  authors?: Author[];
  selectedAuthorId?: string;
  
  constructor(private authorService: AuthorService){}

  ngOnInit(): void {
      this.retrieveAuthors();
  }

  retrieveAuthors(): void {
    this.authorService.getAll()
      .subscribe({
        next: (data) => {
          this.authors = data;
        },
        error: (e) => console.error(e)
      });
  }

    // ControlValueAccessor methods
    onChange: any = () => {};
    onTouch: any = () => {};
  
    writeValue(value: any): void {
      this.selectedAuthorId = value;
    }
  
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: any): void {
      this.onTouch = fn;
    }

    onAuthorChange(): void {
      this.writeValue(this.selectedAuthorId);
      this.onChange(this.selectedAuthorId);
      
    }
  

}

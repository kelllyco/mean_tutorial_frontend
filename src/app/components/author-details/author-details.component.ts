import { Component, Input, OnInit } from '@angular/core';
import { Author } from '../../models/author.model';
import { AuthorService } from '../../services/author.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent implements OnInit{

  @Input() currentAuthorId: string = "";

  currentAuthor: Author = {
    name: '',
    website: ''
  };

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute) {  }

  ngOnInit(): void {
      if (this.currentAuthorId == ""){
        this.getAuthor(this.route.snapshot.params["id"]);
      }
      else {
        this.getAuthor(this.currentAuthorId);
      }
  }

  getAuthor(id: string): void {
    this.authorService.get(id)
      .subscribe({
        next: (data) => {
          this.currentAuthor = data;
        },
        error: (e) => console.error(e)
      });
  }
}

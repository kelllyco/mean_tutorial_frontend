import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { Author } from '../../models/author.model';
import { TutorialService } from '../../services/tutorial.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  authors?: Author[];
  currentIndex = -1;
  title = '';



  constructor(private tutorialService: TutorialService, private authorService: AuthorService) {}

  ngOnInit(): void {
      this.retrievePublished();
  }

  retrievePublished(): void {
    this.tutorialService.getPublished()
      .subscribe({
        next: (data) => {
          this.tutorials = data;
        },
        error: (e) => console.error(e)
      });
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



  searchTitle(): void {
    this.tutorialService.findPublishedByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}

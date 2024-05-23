import { Component, OnInit, Input } from '@angular/core';
import { Tutorial } from '../../models/tutorial.model';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  
@Input() authorId: String = "";

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';



  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
      if (this.authorId === ""){
        this.retrievePublished();
      }
      else {
        this.retrieveByAuthor();
      }   
  }

  retrieveByAuthor(): void {
    this.tutorialService.findPublishedByAuthorId(this.authorId)
      .subscribe({
        next: (data) => {
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
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

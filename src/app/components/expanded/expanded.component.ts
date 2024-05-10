import { Component, OnInit, Input } from '@angular/core';
import { TutorialService } from '../../services/tutorial.service';
import { Tutorial } from '../../models/tutorial.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expanded',
  templateUrl: './expanded.component.html',
  styleUrl: './expanded.component.css'
})
export class ExpandedComponent implements OnInit {

  @Input() currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getTutorial(this.route.snapshot.params["id"]);
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTutorial = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}

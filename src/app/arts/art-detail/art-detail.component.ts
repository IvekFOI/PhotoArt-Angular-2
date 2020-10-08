import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { Art } from '../art.model';
import { ArtService } from '../art.service';

@Component({
  selector: 'app-art-detail',
  templateUrl: './art-detail.component.html',
  styleUrls: ['./art-detail.component.css']
})
export class ArtDetailComponent implements OnInit {
  art: Art;
  editing: boolean = false;
  // authUserId: string;

  constructor( private route: ActivatedRoute, private router: Router, private artService: ArtService, private authService: AuthService ) { }

  ngOnInit(): void {
    this.getArt();
    // this.authUserId = this.authService.currentUserId;
  }

  getArt() {
    const id = this.route.snapshot.paramMap.get('id');
    this.artService.getArtData(id).subscribe(
      art => (this.art = art)
    );
  }

  updateArt() {
    const formData = { 
      title: this.art.title, 
      description: this.art.description 
    }
    const id = this.route.snapshot.paramMap.get('id');
    this.artService.update(id, formData);
    this.editing = false;
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.artService.delete(id);
    this.router.navigate(['/arts']);
  }
}

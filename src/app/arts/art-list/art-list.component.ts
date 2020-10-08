import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Art } from '../art.model';
import { ArtService } from '../art.service';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {
  arts: Observable<Art[]>;

  constructor( private artService: ArtService, public auth: AuthService ) { }

  ngOnInit(): void {
    this.arts = this.artService.getArts();
  }

  delete(id: string) {
    this.artService.delete(id);
  }

}

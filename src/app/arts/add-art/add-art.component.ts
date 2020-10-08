import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { ArtService } from '../art.service';

@Component({
  selector: 'app-add-art',
  templateUrl: './add-art.component.html',
  styleUrls: ['./add-art.component.css']
})
export class AddArtComponent implements OnInit {
  description: string;
  image: string;
  title: string;

  saving = 'Create';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor( private auth: AuthService, private artService: ArtService, private storage: AngularFireStorage, private router: Router ) { }

  ngOnInit(): void {
  }

  createArt() {
    const artData = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      description: this.description,
      image: this.image || null,
      published: new Date(),
      title: this.title
    };
    this.artService.create(artData);
    this.title = '';
    this.description = '';
    this.image = '';

    this.saving = 'Created!'
    this.router.navigate(['/arts']);
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `arts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('Please upload an image!')
    } else {
      const task = this.storage.upload(path, file);
      const ref = this.storage.ref(path);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => (this.image = url));
        })
        )
        .subscribe();
    }
  }


}

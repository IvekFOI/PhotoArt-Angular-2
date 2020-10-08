import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Art } from './art.model';


@Injectable( { providedIn: 'root' })
export class ArtService {
  artsCollection: AngularFirestoreCollection<Art>
  artDoc: AngularFirestoreDocument<Art>

  constructor(private afs: AngularFirestore) {
    this.artsCollection = this.afs.collection('arts', ref =>
      ref.orderBy('published', 'desc')
    )
  }

  getArts() {
    return this.artsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Art
        const id = a.payload.doc.id
        return { id, ...data }
      })
    }))
  }

  getArtData(id: string) {
    this.artDoc = this.afs.doc<Art>(`arts/${id}`)
    return this.artDoc.valueChanges()
  }

  getArt(id: string) {
    return this.afs.doc<Art>(`arts/${id}`)
  }

  create(art: Art) {
    this.artsCollection.add(art)
  }

  delete(id: string) {
    return this.getArt(id).delete()
  }

  update(id: string, art: Art) {
    return this.getArt(id).update(art)
  }
}

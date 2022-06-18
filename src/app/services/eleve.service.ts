import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Eleve } from './../models/eleve';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private _url = `${environment.apiUrl}/eleves`;
  constructor(private http:HttpClient) { }
  index():Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this._url);
  }
  show(id: number){
    const eleve = this.http.get(this._url);

  if(eleve) {
    return eleve;
  }
  else {
    throw new Error('FaceSnap not found!');
  }

  }
  store(eleve: Eleve) {

    return this.http.post(this._url, eleve);
  }
  update (eleve: Eleve, id: string) {
    return this.http.put(`${this._url}/update/${id}`, eleve);
  }
  delete (id: string) {

    return this.http.delete(`${this._url}/delete/${id}`);
  }

}

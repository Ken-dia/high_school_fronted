import { environment } from './../../environments/environment';
import { Classe } from './../models/classe';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private _url = `${environment.apiUrl}/classes`;

  constructor(private http:HttpClient) { }
  index():Observable<Classe[]> {
    return this.http.get<Classe[]>(this._url);
  }
  show(id: number){
    const classe = this.http.get(`${this._url}/${id}`);

    if(classe) {
      return classe;
    }
    else {
      throw new Error('FaceSnap not found!');
    }

  }
  store(classe: Classe) {
    return this.http.post(this._url,classe);
  }
  update (classe: Classe, id: string) {
    return this.http.put(`${this._url}/update/${id}`, classe);
  }
  delete (id: any) {
   return this.http.delete(`${this._url}/delete/${id}`)
  }
}

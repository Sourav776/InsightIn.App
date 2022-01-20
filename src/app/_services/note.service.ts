import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Note } from '../model/note';
import { NoteType } from '../model/NoteType';
import { Observable } from 'rxjs/internal/Observable';

const AUTH_API = 'http://localhost:54834/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteList:Note[] | undefined;
  TypeList:NoteType[] | undefined;
  constructor(private http: HttpClient) { }
//   async refreshList()
//  {
//    const res = await this.http.get(AUTH_API + 'Note/get-all').toPromise();
//    this.http.get<any>(AUTH_API + 'Note/get-note-type-dropdown', data)
//     return this.noteList = (res as Note[]);
//  }
 refreshList(data?: any): Observable<any> {
  return this.http.get<any>(AUTH_API + 'Note/get-all', data);
}
getTypeList(data?: any): Observable<any> {
  return this.http.get<any>(AUTH_API + 'Note/get-note-type-dropdown', data);
}
 postNote(formData:Note){
  console.log('Vo');
return this.http.post(AUTH_API+'Note/add',formData);
}

putNote(formData:any){
console.log('update note');
return this.http.put(AUTH_API+'Note/update/'+formData.noteId,formData);
}
deleteEmployee(id:number)
{
  return this.http.get<any>(AUTH_API+'Note/delete/'+id);
}
}

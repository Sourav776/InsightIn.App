import { Component, OnInit } from '@angular/core';
import { NoteService } from '../_services/note.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  noteList:any;
  constructor(private noteService: NoteService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getNoteList();
  }
  getNoteList()
  {
    this.noteService.refreshList().subscribe(
      data => {
        console.log(data);
        this.noteList=data.apiData;
      },
      error => {
        console.log(error);
      }
    );
  }
}

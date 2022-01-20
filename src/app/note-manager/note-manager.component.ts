import { Component, OnInit } from '@angular/core';
import { NoteService } from '../_services/note.service';
import { NoteType } from '../model/NoteType';
import { Note } from '../model/note';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-note-manager',
  templateUrl: './note-manager.component.html',
  styleUrls: ['./note-manager.component.css']
})
export class NoteManagerComponent implements OnInit {

  title='Note Manager';
  typeList:any;
  noteList:any;
  yesNoDropDown:any;
  selected:any;
  yesNoSelected:any;
  form:any= new Note();
  constructor(private noteService: NoteService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getTypeList();
    this.getNoteList();
    this.yesNoDropDown=[
      {key : "Y", value : "Yes"},
      {key : "N", value : "No"}
    ]
  }
  populateForm(note:any){
    console.log('populate');
    this.form.noteId=note.noteId;
    this.form.NoteType=note.noteType;
    this.selected=note.noteType;
    this.form.NoteContent=note.noteContent;
    this.form.ReminderTimeDate=note.reminderTimeDate;
    this.form.DueTimeDate=note.dueTimeDate;
    if(note.isComplete)
    {
      this.yesNoSelected='Y'
    }
    else{
      this.yesNoSelected='N'
    }
    // this.form.NoteContent=note.noteContent;
    // this.form.NoteContent=note.noteContent;  
  }
  onDelete(id:any)
  {
    if(confirm('You are about to delete this record! '))
    {
    this.noteService.deleteEmployee(id).subscribe(res=>
      {
        this.getNoteList();
      });
    }
  }
  update(e:any){
    this.selected = e.target.value
    if(this.selected!=2)
    {
      this.form.ReminderTimeDate=null;
    }
    this.form.IsComplete=false;
  }
  ChangeIsComplete(e:any){
    if(e.target.value=='Y')
    {
      this.yesNoSelected='Y'
      this.form.IsComplete=true;
      this.form.DueTimeDate=null;
    }
    else{
      this.form.IsComplete=false;
      this.yesNoSelected='N'
    }
  }
  onSubmit(): void {
    const formData = this.form;
    this.form.NoteType=this.selected;
    this.form.userName=this.tokenStorage.getUser();
    if(this.form.noteId==null)
    {
    this.noteService.postNote(this.form).subscribe(
      res => {
        console.log(res, 'res');
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );}
    else
    {
      this.noteService.putNote(this.form).subscribe(
        res => {
          console.log(res, 'res');
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  getTypeList()
  {
    this.noteService.getTypeList().subscribe(
      data => {
        console.log(data);
        this.typeList=data.apiData;
      },
      error => {
        console.log(error);
      }
    );
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

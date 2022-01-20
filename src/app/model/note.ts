export class Note {
    NoteId:number | undefined;
    NoteType:number | undefined;
    NoteContent :string | undefined;
    NoteDate :Date | undefined;
    ReminderTimeDate: Date| undefined;
    UserName: string | undefined;
    IsComplete :boolean | false | undefined;
    DueTimeDate: Date| undefined;
}
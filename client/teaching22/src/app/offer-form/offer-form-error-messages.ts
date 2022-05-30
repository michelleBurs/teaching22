export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string) {
  }
}

export const OfferFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Titel muss angegeben werden'),
  new ErrorMessage('description', 'required', 'Eine Beschreibung muss angegeben werden'),
  new ErrorMessage('date', 'required', 'Ein Datum muss angegeben werden'),
  new ErrorMessage('startTime', 'required', 'Eine Startzeit muss angegeben werden'),
  new ErrorMessage('endTime', 'required', 'Eine Endzeit muss angegeben werden'),
  new ErrorMessage('course_id', 'required', 'Ein Course muss angegeben werden'),
  new ErrorMessage('course_id', 'min', 'Ein Course muss mindestens 1 sein'),
];


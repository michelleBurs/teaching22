export class ErrorMessage {
  constructor(public forControl: string,
              public forValidator: string,
              public text: string) {
  }
}

export const InqurieFormErrorMessages = [
  new ErrorMessage('date', 'required', 'Ein Datum muss angegeben werden'),
  new ErrorMessage('startTime', 'required', 'Eine Startzeit muss angegeben werden'),
  new ErrorMessage('endTime', 'required', 'Eine Endzeit muss angegeben werden'),
];


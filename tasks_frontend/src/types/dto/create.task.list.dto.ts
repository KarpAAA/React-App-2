
export class CreateTaskListDTO {
    constructor(
        public title:string,
        public number:number,
        public id?:number
    ) {}

}
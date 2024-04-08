
export class CreateTaskListDTO {
    constructor(
        public title:string,
        public number:number,
        public boardId: number,
        public order?:number,
        public id?:number
    ) {}

}
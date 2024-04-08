import {Task} from "./task";

export class TaskList {
    constructor(
        public title:string,
        public number:number,
        public id:number,
        public tasks: Task[]
    ) {}

}
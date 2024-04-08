import {TaskList} from "./task.list";

export class Board {
    constructor(
        public id:number,
        public title:string,
        public tasksLists: TaskList[]
    ) {}
}
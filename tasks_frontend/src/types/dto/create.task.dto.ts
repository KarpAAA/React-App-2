import {TaskStatus} from "../task.status";
import {TaskPriority} from "../task.priority";
import {Operation} from "../operation";

export class CreateTaskDto {
    constructor(
        public title: string,
        public content: string,
        public date: string,
        public status: TaskStatus,
        public priority: TaskPriority,
        public history?: Operation[],
        public id?: number,
    ) {
    }
}
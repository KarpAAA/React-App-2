import {Operation} from "./operation";
import {TaskPriority} from "./task.priority";
import {TaskStatus} from "./task.status";

export class Task {

    constructor(
        public title: string,
        public content: string,
        public date: string,
        public status: TaskStatus,
        public priority: TaskPriority,
        public history: Operation[],
        public id: number,
        public tasksListId: number
    ) {
    }
}
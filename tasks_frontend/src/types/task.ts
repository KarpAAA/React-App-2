import {Operation} from "./operation";
import {TaskPriority} from "./task.priority";
import {TaskStatus} from "./task.status";

export class Task {
    constructor(
        public title: string,
        public content: string,
        public date: string,
        public status: "TODO" | "IN_PROGRESS" | "DONE" | "REVIEW",
        public priority: "LOW" | "MEDIUM" | "HIGH",
        public history: Operation[],
        public id: number,
        public tasksListId: number
    ) {
    }
}
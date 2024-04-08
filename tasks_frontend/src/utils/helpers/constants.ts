import {TaskStatus} from "../../types/task.status";
import {TaskPriority} from "../../types/task.priority";

export const Constants = {
    maxTaskChars: 50,
    TaskStatusStyle: {
        [TaskStatus.TODO] : "#A9A9A9",
        [TaskStatus.IN_PROGRESS]: "#1E90FF",
        [TaskStatus.DONE]: "#2E8B57",
        [TaskStatus.REVIEW]: "#FFA500",
    },
    TaskPriorityStyle: {
        [TaskPriority.LOW]: "#5eba7d",
        [TaskPriority.MEDIUM]: "#ffc107",
        [TaskPriority.HIGH]: "#ef5350",
    }
}
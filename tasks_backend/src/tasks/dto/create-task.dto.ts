import { TaskPriority } from "../../entities/task/task.priority";
import { TaskStatus } from "../../entities/task/task.status";
import { TasksList } from "../../entities/tasks.list.model";
import { Operation } from "../../entities/operation.model";

export class CreateTaskDto {
  title: string
  content: string
  date: string
  priority: TaskPriority
  status: TaskStatus
  tasksListId: number
  history?: Operation[]
}

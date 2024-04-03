import { Operation } from "../../entities/operation.model";


export class TaskDTO {
  id: number
  title: string
  content: string
  date: string
  priority: string
  status: string
  history: Operation[]
}
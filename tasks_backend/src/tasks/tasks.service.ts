import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Repository } from "typeorm";
import { Task } from "../entities/task/task.model";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksList } from "../entities/tasks.list.model";
import { TaskDTO } from "./dto/task.dto";
import DateHelpers from "../utils/helpers/date.helpers";
import { TaskPriority } from "../entities/task/task.priority";
import { TaskStatus } from "../entities/task/task.status";
import { Operation } from "../entities/operation.model";

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TasksList)
    private tasksListRepository: Repository<TasksList>
  ) {
  }

  async create(createTaskDto: CreateTaskDto) {
    const { tasksListId, date, ...other } = createTaskDto;

    const list =
      await this.tasksListRepository.findOne({ where: { id: tasksListId } });


    return this.taskRepository.save({ list, date: new Date(date), ...createTaskDto });
  }

  async findAll() {
    const tasks = await this.taskRepository.find({ relations: ["list"] });
    return tasks.map(task => this.taskToTaskDTO(task));
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ["list"] });
    return this.taskToTaskDTO(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { tasksListId, history, ...other } = updateTaskDto;

    const task = await this.taskRepository.findOne({ where: { id }, relations: ["list"] });
    if (tasksListId){
      const newTaskList = await this.tasksListRepository.findOne({ where: { id: tasksListId } });

      task.history = [
        this.formOperationObject(task, " moved from " + task.list.title +  " to " + newTaskList.title),
        ...task.history
      ];
      task.list = newTaskList;
    }



    const editOperation = this.formUpdateOperation(task, other);
    if(editOperation){
      task.history = [
        editOperation,
        ...task.history
      ];
    }

    return this.taskRepository.save({ ...task, ...other });
  }

  remove(id: number) {
    return this.taskRepository.delete({ id });
  }

  public taskToTaskDTO(task: Task): TaskDTO {
    return {
      ...task,
      date: DateHelpers.transformDateWithDayOfTheWeek(task.date),
      priority: TaskPriority[task.priority],
      status: TaskStatus[task.status]

    };
  }

  public formUpdateOperation(oldTask: Task, newFields: any): Operation {
    const changes = this.compareObjects(oldTask, newFields);
    if(!changes) return null;
    return this.formOperationObject(oldTask, changes);
  }
  private formOperationObject(task: Task, changes: string): Operation {
    return {
      action: `Task(${task.id}) ${task.title}\n` + changes,
      dateTime: (new Date()).toLocaleDateString() + " " +(new Date()).toLocaleTimeString()
    };
  }

  private compareObjects({ history, ...obj1 }, obj2) {
    let result = "";

    const keys = Object.keys(obj2).filter(key => obj1.hasOwnProperty(key));


    keys.forEach(key => {
      const value1 = obj1[key];
      const value2 = obj2[key];


      if (value1 != value2) {
        if (key === "priority") {
          result += key + " was changed from " + TaskPriority[value1] + " to " + TaskPriority[value2] + "\n";
        } else if (key === "status") {
          result += key + " was changed from " + TaskStatus[value1] + " to " + TaskStatus[value2] + "\n";
        } else if (key === "date") {

          if (value1 !== value2) {
            result += "Due " + key + " was changed from " + value1 + " to " + value2 + "\n";
          }

        } else result += key + " was changed from " + value1 + " to " + value2 + "\n";

      }

    });

    return result;
  }

}

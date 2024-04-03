import { Injectable } from "@nestjs/common";
import { CreateTasksListDto } from "./dto/create-tasks-list.dto";
import { UpdateTasksListDto } from "./dto/update-tasks-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksList } from "../entities/tasks.list.model";
import { Repository } from "typeorm";
import { TasksService } from "../tasks/tasks.service";

@Injectable()
export class TasksListService {

  constructor(private taskService: TasksService,
              @InjectRepository(TasksList)
              private tasksListRepository: Repository<TasksList>) {
  }

  create(createTasksListDto: CreateTasksListDto) {
    return this.tasksListRepository.save({ ...createTasksListDto });
  }

  async findAll() {
    const taskList = await this.tasksListRepository.find({ relations: ["tasks"] });
    const res = taskList.map(taskList => ({
      ...taskList,
      tasks: taskList.tasks.map(task => this.taskService.taskToTaskDTO(task))
    })).sort((taskList1,taskList2) => taskList1.id - taskList2.id);

    return res;
  }

  findOne(id: number) {
    return this.tasksListRepository.findOne({ where: { id }, relations: ["tasks"] });
  }

  async update(id: number, updateTasksListDto: UpdateTasksListDto) {
    const { tasks, ...other } = updateTasksListDto;
    const tasksList = await this.findOne(id);

    if (updateTasksListDto.tasks) tasksList.tasks = [...tasksList.tasks, ...tasks];

    return this.tasksListRepository.save({ ...tasksList, ...other });
  }

  remove(id: number) {
    return this.tasksListRepository.delete({ id });
  }
}

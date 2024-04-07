import { Injectable } from "@nestjs/common";
import { CreateTasksListDto } from "./dto/create-tasks-list.dto";
import { UpdateTasksListDto } from "./dto/update-tasks-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TasksList } from "../entities/tasks-list.model";
import { Repository } from "typeorm";
import { TaskBoard } from "../entities/task-board.model";
import { UpdateTasksListOrderDto } from "./dto/update-tasks-list-order.dto";

@Injectable()
export class TasksListService {

  constructor(@InjectRepository(TasksList) private tasksListRepository: Repository<TasksList>,
              @InjectRepository(TaskBoard) private boardRepository: Repository<TaskBoard>
  ) {
  }

  async create({ boardId, ...other }: CreateTasksListDto) {
    const board = await
      this.boardRepository.findOne({ where: { id: boardId } });
    if (!board) {
      throw new Error("Board not found");
    }
    const taskList = await this.tasksListRepository.save({ ...other, board });

    return this.tasksListRepository.update(taskList.id, { order: taskList.id });
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

  async updateOrder({ id: i, order }: UpdateTasksListOrderDto) {
    const tasksListMoved = await this.findOne(order);
    const tasksListForced = await this.findOne(i);

    await this.tasksListRepository.save({ ...tasksListMoved, order: tasksListForced.order });
    return this.tasksListRepository.save({ ...tasksListForced, order: tasksListMoved.order });
  }
}

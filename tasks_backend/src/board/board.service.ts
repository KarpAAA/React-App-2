import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TaskBoard } from "../entities/task-board.model";
import { TasksList } from "../entities/tasks-list.model";

@Injectable()
export class BoardService {

  constructor(
    @InjectRepository(TaskBoard) private boardRepository: Repository<TaskBoard>,
    @InjectRepository(TasksList) private taskListsRepository: Repository<TasksList>
  ) {
  }

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  async findAll() {
    const boards = await this.boardRepository.find({ relations: ["tasksLists.tasks"] });
    const updatedBoard = boards.map(boardItem => {
      boardItem.tasksLists =
        boardItem.tasksLists.sort((t1, t2) => t1.id - t2.id);
      return boardItem;
    });
    return updatedBoard;
  }


  async findOne(id: number) {

    const board = await
      this.boardRepository.findOne({ where: { id }, relations: ["tasksLists.tasks"] });

    if (board) {
      board.tasksLists =
        board.tasksLists
          .sort((t1, t2) => t1.id - t2.id)
          .sort((t1, t2) => t1.order - t2.order);
      return board;
    }

    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(id);
    if (updateBoardDto.newTasksListId) {
      const taskList =
        await this.taskListsRepository.findOne({ where: { id: updateBoardDto.newTasksListId } });

      if (board && taskList) {
        board.tasksLists = [...board.tasksLists, taskList];
        return this.boardRepository.save(board);
      }
    }
    return this.boardRepository.save({ ...board, ...updateBoardDto });
  }

  remove(id: number) {
    return this.boardRepository.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "../entities/operation.model";
import { In, Repository } from "typeorm";
import { OperationDTO } from "./dto/operation.dto";
import { TaskBoard } from "../entities/task-board.model";

@Injectable()
export class HistoryService {

  constructor(
    @InjectRepository(Operation) private operationRepository: Repository<Operation>,
    @InjectRepository(TaskBoard) private boardRepository: Repository<TaskBoard>,
  ){}

  async findAll(boardId: number) {
    const board = await this.boardRepository.findOne({where: {id: boardId}});
    if(board){
      const tasksIds = [];
      board.tasksLists.forEach(list =>
        list.tasks
          .map(t => t.id)
          .forEach(tId => tasksIds.push(tId))
      );

      const operations = await  this.operationRepository.find({
        where: {task: {id: In(tasksIds)}}
      });

      return operations.map(operation => this.operationToOperationDTO(operation));
    }
    return "Bad request";
  }

  public operationToOperationDTO(operation: Operation): OperationDTO{
    const {task, ...operationInfo} = operation;
    return {
      ...operationInfo
    }
  }
}

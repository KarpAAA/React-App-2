import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Operation } from "../entities/operation.model";
import { Repository } from "typeorm";
import { TasksList } from "../entities/tasks.list.model";
import { OperationDTO } from "./dto/operation.dto";
import DateHelpers from "../utils/helpers/date.helpers";

@Injectable()
export class HistoryService {

  constructor(@InjectRepository(Operation) private operationRepository: Repository<Operation>){}

  async findAll() {
    const operations = await  this.operationRepository.find({});

    return operations.map(operation => this.operationToOperationDTO(operation));
  }

  public operationToOperationDTO(operation: Operation): OperationDTO{
    const {task, ...operationInfo} = operation;
    return {
      ...operationInfo
    }
  }
}

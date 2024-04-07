import { Controller, Get, Param } from "@nestjs/common";
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}
  @Get(":boardId")
  findAll(@Param('boardId') boardId: string) {
    return this.historyService.findAll(+boardId);
  }

}

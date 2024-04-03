import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Task } from "./entities/task/task.model";
import { TasksList } from "./entities/tasks.list.model";
import { Operation } from "./entities/operation.model";
import { TasksModule } from "./tasks/tasks.module";
import { TasksListModule } from "./tasks-list/tasks-list.module";
import { HistoryModule } from "./history/history.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Task, TasksList, Operation],
      synchronize: true
    }),
    TasksModule,
    TasksListModule,
    HistoryModule

  ]
})
export class AppModule {
}

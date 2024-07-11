import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Task} from "./entities/task/task.model";
import {TasksList} from "./entities/tasks-list.model";
import {Operation} from "./entities/operation.model";
import {TasksModule} from "./tasks/tasks.module";
import {TasksListModule} from "./tasks-list/tasks-list.module";
import {HistoryModule} from "./history/history.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TaskBoard} from "./entities/task-board.model";
import {BoardModule} from './board/board.module';
import * as Joi from "joi";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                STAGE: Joi.string()
                    .valid('development', 'production')
                    .default('development'),
                DATABASE_URL: Joi.string().required(),
                PORT: Joi.number().default(3000)
            })
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const isProduction = configService.get('STAGE') === 'production';
                return {
                    type: "postgres",
                    url: configService.get('DATABASE_URL'),
                    ssl: isProduction,
                    extra: {
                        ssl: isProduction ? {rejectUnauthorized: false} : null
                    },
                    entities: [Task, TasksList, Operation, TaskBoard],
                    synchronize: true
                }
            }
        }),
        TasksModule,
        TasksListModule,
        HistoryModule,
        BoardModule

    ]
})
export class AppModule {
}
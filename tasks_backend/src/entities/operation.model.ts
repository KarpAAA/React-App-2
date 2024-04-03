import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "./task/task.model";


@Entity()
export class Operation {

  @PrimaryGeneratedColumn()
  id?:number;

  @Column({length: 500})
  action:string

  @Column()
  dateTime:string;

  @ManyToOne(type => Task, task => task.history, {onDelete: "CASCADE"})
  task?: Task

}
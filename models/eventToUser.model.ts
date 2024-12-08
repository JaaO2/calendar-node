import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Event } from './event.model';

@Table({ tableName: 'events_to_users', timestamps: false })
export class EventToUser extends Model<EventToUser> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER })
  eventId!: number;

  @BelongsTo(() => Event)
  event!: Event;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  cancelled!: boolean
}

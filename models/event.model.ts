import {Table, Column, Model, DataType, BelongsTo, ForeignKey, HasMany} from 'sequelize-typescript';
import {User} from './user.model';
import {EventToUser} from './eventToUser.model';

@Table({tableName: 'events', timestamps: false})
export class Event extends  Model {
    @Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
    id !: number;

    @Column({type: DataType.STRING, allowNull: false})
    eventName !: string;

    @Column({type: DataType.STRING, allowNull: false})
    description !: string;

    @Column({type: DataType.DATE, allowNull: false})
    date !: Date;

    @Column({type: DataType.TIME, allowNull: false})
    time_from !: Date;

    @Column({type: DataType.TIME, allowNull: false})
    time_to !: Date;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId !: number;

    @HasMany(() => EventToUser)
    eventToUsers !: EventToUser[];

    @BelongsTo(() => User)
    user !: User;
};
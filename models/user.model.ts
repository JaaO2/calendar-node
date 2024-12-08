import {Table, Column, Model, DataType, BeforeCreate, BeforeUpdate} from 'sequelize-typescript';
import bcrypt from "bcrypt";

@Table({tableName: 'users', timestamps: false})
export class User extends  Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id !: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username !: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password !: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description !: string;

    @BeforeCreate
    @BeforeUpdate
    static async hashPassword(user: User) : Promise<void> {
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }

     async checkPassword(password: string) : Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
};


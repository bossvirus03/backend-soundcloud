import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like {
  @PrimaryGeneratedColumn({
    type: "bigint",
    name: "like_id",
  })
  id: number;

  @Column({
    name: "track",
    nullable: false,
    default: "",
  })
  track: string;

  @Column({
    name: "user",
    nullable: false,
    default: "",
  })
  user: string;

  @Column({
    name: "quantity",
    nullable: false,
    default: "",
  })
  quantity: number;
}

import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_MICROSERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: "user",
            brokers: ["localhost:29092"],
          },
          consumer: {
            groupId: "user-microservice-consumer",
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

// Этот модуль — изолированная коробка для всего, что связано с сущностью "Пользователь".
@Module({
  // Записываем сюда контроллер пользователей. NestJS прочитает его пути (например, /users)
  controllers: [UsersController],

  // Записываем сюда сервис пользователей, чтобы NestJS мог автоматически внедрять его
  // через конструктор в наш UsersController.
  providers: [UsersService],
})
export class UsersModule {}

import { Controller } from "@nestjs/common";

// Все эндпоинты (маршруты) внутри этого контроллера будут начинаться с "/users"
@Controller("users")
export class UsersController {
  // Далее тут будет конструктор для внедрения UsersService
  // и методы @Get(), @Post() для создания и получения пользователей из базы данных.
}

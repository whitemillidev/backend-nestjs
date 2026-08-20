import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

// @Controller - декоратор, который делает этот класс обработчиком запросов.
// Все URL-адреса внутри этого класса будут автоматически начинаться с префикса "/api"
@Controller("/api")
export class AppController {
  // Конструктор нужен для Внедрения Зависимостей (Dependency Injection).
  // Пишем "private appService: AppService" (с указанием типа класса через двоеточие).
  // NestJS видит этот тип, САМ находит класс AppService, САМ создает под капотом "new AppService()"
  // и вставляет готовый живой ОБЪЕКТ в переменную "this.appService".
  constructor(private appService: AppService) {}
  // @Get - декоратор, который связывает эту функцию с HTTP-методом GET.
  // NestJS автоматически склеивает префикс контроллера и путь метода: "/api" + "/users" = "/api/users".
  // Никаких ручных файлов роутера (Router), как в Express, создавать не нужно.
  @Get("/users")
  getUsers() {
    // Контроллер "глупый" — он сам не хранит и не считает данные.
    // Он просто вызывает функцию "getUsers()" у живого объекта сервиса и сразу возвращает результат.
    // NestJS автоматически превратит возвращенный массив в JSON-формат и отправит клиенту.
    return this.appService.getUsers();
  }
}

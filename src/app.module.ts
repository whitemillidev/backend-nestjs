import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";

// @Module — декоратор, который объединяет разные части кода в один блок (модуль).
// NestJS не увидит ваши файлы, если они не зарегистрированы в модуле.
@Module({
  // controllers — массив, куда мы ОБЯЗАТЕЛЬНО записываем все контроллеры этого модуля, чтобы NestJS прочитал их роуты.
  controllers: [],
  // providers — массив, куда мы ОБЯЗАТЕЛЬНО записываем сервисы.
  // Это дает сигнал NestJS: "Возьми этот класс под свой контроль, чтобы при необходимости создавать его объекты и вставлять в конструкторы".
  providers: [],
  // imports — массив, куда можно подключать ТОЛЬКО другие модули (классы с декоратором @Module).
  // Сюда идут как сторонние библиотеки (например, для работы с БД), так и наши собственные другие модули проекта.
  imports: [
    // ConfigModule.forRoot() — запускает встроенный модуль конфигурации NestJS.
    // .forRoot() метод настраивает модуль для работы во всем приложении (глобально).
    ConfigModule.forRoot({
      // envFilePath — свойство-настройка, которое указывает фреймворку точный путь, к текстовому файлу с переменными окружения.
      // В данном случае объявляем: "Читай файл с именем .env в корне проекта".
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // SequelizeModule — это готовый модуль для работы с базой данных ORM Sequelize.
    // .forRoot() — специальный метод-настройщик, динамически настраивает подключение к базе данных Postgres.
    // Метод принимает объект конфигурации, чтобы NestJS знал, куда именно отправлять SQL-запросы.
    SequelizeModule.forRoot({
      dialect: "postgres", // Объявляем Sequelize, что работаем именно с СУБД PostgreSQL
      host: process.env.POSTGRES_HOST, // Адрес сервера БД (в данном случае — ваш собственный компьютер)
      port: Number(process.env.POSTGRES_PORT), // Стандартный порт, на котором всегда работает PostgreSQL
      username: process.env.POSTGRES_USER, // Имя пользователя в вашей базе данных
      password: process.env.POSTGRES_PASSWORD, // Пароль от вашей базы данных Postgres
      database: process.env.POSTGRES_DB, // Название конкретной базы данных, которую создали для проекта
      // models — массив, куда мы передаем классы-чертежи наших таблиц.
      // Добавив сюда [User], мы явно приказали Sequelize зарегистрировать модель пользователя в базе данных.
      models: [User],
      autoLoadModels: true, // autoLoadModels: true — заставляет NestJS автоматически находить все файлы таблиц (моделей) по всему проекту и регистрировать их в базе данных.
      // Больше не нужно вручную импортировать и вписывать каждую таблицу в массив "models" выше.
    }),
    UsersModule,
  ],
})
export class AppModule {}

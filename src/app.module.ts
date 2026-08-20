import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

// @Module — декоратор, который объединяет разные части кода в один блок (модуль).
// NestJS не увидит ваши файлы, если они не зарегистрированы в модуле.
@Module({
  // controllers — массив, куда мы ОБЯЗАТЕЛЬНО записываем все контроллеры этого модуля, чтобы NestJS прочитал их роуты.
  controllers: [AppController],

  // providers — массив, куда мы ОБЯЗАТЕЛЬНО записываем сервисы.
  // Это дает сигнал NestJS: "Возьми этот класс под свой контроль, чтобы при необходимости создавать его объекты и вставлять в конструкторы".
  providers: [AppService],
})
export class AppModule {}

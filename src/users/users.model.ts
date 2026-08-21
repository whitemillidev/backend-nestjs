import { Column, DataType, Model, Table } from "sequelize-typescript";

// Интерфейс-чертеж, который описывает поля, необходимые ИМЕННО ДЛЯ СОЗДАНИЯ записи.
// Он нужен для подсказок TypeScript, чтобы мы случайно не забыли передать пароль или имейл при регистрации нового пользователя.
// Поля типа id или banned сюда не пишутся, их база заполнит сама.
interface UserCreationAtrs {
  email: string;
  password: string;
}

// @Table — декоратор Sequelize. Он превращает этот класс в физическую таблицу внутри базы данных PostgreSQL.
// Параметр tableName явно задает имя таблицы в базе — "users".
@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAtrs> {
  // <User, UserCreationAtrs> — это Дженерики (угольные скобки-подсказки для базового класса Model).
  // Первый параметр (User) говорит системе, что из базы будут возвращаться объекты именно этого класса.
  // Второй параметр (UserCreationAtrs) жестко контролирует, какие поля обязательны при вызове метода User.create({...}).

  // @Column — декоратор, превращающий свойство класса в колонку таблицы в базе данных.
  // type: DataType.INTEGER — переводит тип number из TypeScript в понятный для Postgres формат целого числа.
  // unique: true — гарантирует, что в базе не появится двух одинаковых ID.
  // autoIncrement: true — включает автоматический счетчик (1, 2, 3...), база сама выдает номера новым юзерам.
  // primaryKey: true — делает колонку главным ключом, по которому база будет мгновенно искать записи.
  // "declare id" — слово declare нужно для новой строгой версии TypeScript. Оно говорит системе: "Встроенное свойство id уже есть в базовом классе Model, я не перезаписываю его, а просто объявляю его тип тут".
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  // unique: true — запрещает регистрацию двух пользователей с одинаковой почтой.
  // allowNull: false — делает поле обязательным на уровне базы данных, запрещая записывать туда пустоту (null).
  // "declare email" — аналогично id, поле email расширяет встроенные механизмы проверки базовой модели.
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  // password! — восклицательный знак (Definite Assignment Assertion) нужен для новых полей, которых нет в базовой модели Model.
  // Он успокаивает TypeScript и обещает ему: "У этого свойства нет начального значения (типа = ''), но оно гарантированно заполнится базой данных позже".
  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  // defaultValue: false — устанавливает значение по умолчанию. При регистрации юзер изначально всегда НЕ забанен.
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned!: boolean;

  // allowNull: true — разрешает полю быть пустым в базе данных (ведь у незабаненного пользователя нет причины бана).
  @Column({ type: DataType.STRING, allowNull: true })
  banReason!: string;
}

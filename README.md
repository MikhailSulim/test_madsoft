# Тестовое задание на позицию Frontend-разработчик в компанию MADSOFT

## Описание

### Заказчик
Образовательное учреждение (например, школа по подготовке к ЕГЭ).
### Проект
Информационная система для проверки знаний учащихся школы.
### Задача
В школе проводятся промежуточные аттестации учащихся в формате теста. Необходимо реализовать клиентскую часть приложения для проведения тестирования.

💡 Тест на этапе MVP должен представлять из себя стандартные тесты:

* варианты ответа
* выбор одного варианта
* выбор нескольких вариантов
* короткий ответ
* развернутый ответ

Также тест может иметь ограничение по времени выполнения.
При перезагрузке страницы необходимо сохранять прогресс выполнения теста.

### Особенности
Заказчик пока не знает какие еще варианты представления вопросов могут ему понадобиться в будущем, поэтому необходимо предусмотреть возможность добавления новых типов вопросов

### Уточнение по внешнему виду
Необходимо реализовать пошаговую форму 
### Ограничения

Приложение должно быть реализовано на React с использованием Typescript. Необходимо реализовать только клиентскую часть приложения, тест можно замокать, содержимое теста не имеет значения.

При необходимости можно использовать любой стейтменеджер, ui kit, библиотеки для работы с формами и т.д.

## Реализация

Задание выполнено с помощью технологий: 
* React
* TypeScript
* BEM
* SCSS

### Функционал
Для реализации функционала с помощью ИИ был составлен список вопросов для теста. Данные вопросы хранятся в виде массива объектов в json файле в папке data (https://mikhailsulim.github.io/test_madsoft/data/questions.json), что облегчает редактирование списка вопросов и времени для выполнения теста.

В приложении реализовано:
* обратный отсчёт времени на тест
* запоминание текущего прогресса в local storage и восстановление данных при перезагрузке страницы
* адаптация графического отображения прогресса под количество вопросов теста
* подсчёт итогов теста

### Установка

Клонировать репозиторий:

```
git clone https://github.com/MikhailSulim/test_madsoft.git
```

Перейти в папку с проектом:

```
cd test_madsoft
```

Установить зависимости:

```
npm i
```

Запустить проект в режиме разработки:

```
npm run start
```

Открыть проект в браузере по адресу:

```
http://localhost:3000
```

create schema press collate utf8mb4_general_ci;

use press;

create table news
(
    id         int auto_increment
        primary key,
    title      varchar(100)                       not null,
    content    text                               not null,
    image      varchar(100)                       null,
    created_at datetime default CURRENT_TIMESTAMP not null
);

create table comments
(
    id      int auto_increment
        primary key,
    news_id int                             not null,
    author  varchar(32) default 'Anonymous' null,
    content text                            not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
);

INSERT INTO press.news (id, title, content, image, created_at) VALUES (2, 'Серверная часть (backend)', 'Представляет из себя API для базовых CRUD-операций с вышеперечисленными сущностями:', null, '2024-02-03 12:44:59');
INSERT INTO press.news (id, title, content, image, created_at) VALUES (8, 'Test2', 'Test2', 'images/920b3c12-bc42-4f91-aad8-1275ff188be3.jpeg', '2024-02-03 18:27:50');


INSERT INTO press.comments (id, news_id, author, content) VALUES (15, 2, 'dilshad', 'test!');

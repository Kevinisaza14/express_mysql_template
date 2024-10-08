drop schema if exists express_mysql_template;
create database express_mysql_template;
use express_mysql_template;

create table users (
    id varchar(255) primary key,
    username varchar(100) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    createdAt datetime default current_timestamp,
    updateAt datetime default current_timestamp on update current_timestamp
);
CREATE TABLE credit_cards (
    id int primary key,
    uid varchar(255) not null,
    credit_card_number varchar(19) not null,
    credit_card_expiry_date date not null,
    credit_card_type varchar(100) not null
);

insert into users (id, userName, email, password) values ('112asda3', 'user1', 'user1@example.com', 'password1');
insert into users (id, userName, email, password) values ('22134asd', 'user2', 'user2@example.com', 'password2');
insert into users (id, userName, email, password) values ('312das', 'user3', 'user3@example.com', 'password3');

select * from users;
CREATE DATABASE notes;
use notes;

CREATE TABLE Users (
    id integer not null auto_increment,
    email varchar(64) not null,
    password varchar(512) not null,
    fullName varchar(64) not null,
    primary key(id)
);

CREATE TABLE Notes (
    id integer not null auto_increment,
    user_id integer not null,
    title text not null,
    content text not null,
    created_date text not null,
    primary key(id)
);

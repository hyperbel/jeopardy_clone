PRAGMA foreign_keys=ON;
CREATE TABLE Games (
    id int not null primary key,
    host text not null
);
CREATE TABLE Players (
    id int not null primary key,
    name txt not null,
    game int not null,
    foreign key(game)
    references Games (id) 
);

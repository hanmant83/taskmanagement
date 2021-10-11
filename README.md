Task Management

Create one schema in postgreSQL with the name of Task

Execute below script on task database

CREATE TABLE task.task(
taskid serial PRIMARY KEY,
taskname varchar(100),
description varchar(1000),
deadline timestamp,
priority INT,
assignedTo INT,
status INT,
inactive boolean,
createdat timestamp,
createdby INT,
updatedat TIMESTAMP,
updatedby INT
)

CREATE TABLE task.users(
userid serial PRIMARY KEY,
firstname varchar(100),
lastname varchar(100),
email varchar(100),
password varchar(100),
inactive boolean,
createdat timestamp,
createdby INT,
updatedat TIMESTAMP,
updatedby INT
)

CREATE TABLE task.masterstatus(
statusid serial PRIMARY KEY,
statusname varchar(100),
inactive boolean,
createdat timestamp,
createdby INT,
updatedat TIMESTAMP,
updatedby INT
)

insert into task.masterstatus values(1,'Pending',fasle,now())
insert into task.masterstatus values(2,'Rejected',fasle,now())
insert into task.masterstatus values(3,'Completed',fasle,now())

Open obove two projects with different visual studia code.

Add database credentials in .env file of server.

run above rojects using npm start command.

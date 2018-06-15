create table trips (
                    trip_id varchar(50),
                    is_deleted boolean,
                    trip_id varchar(50),
                    route_id varchar(50),
                    start_time time,
                    schedule_relationship varchar(50),
                    id varchar(20),
                    trip_short_name varchar(50),
                    trip_type varchar(50),
                    PRIMARY KEY (trip_id),
                    FOREIGN KEY (route_id) REFERENCES routes (route_id)
);

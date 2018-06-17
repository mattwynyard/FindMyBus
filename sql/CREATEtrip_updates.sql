create table trip_updates (
                    trip_id varchar(50),
                    route_id varchar(50),
                    start_time time,
                    schedule_relationship varchar(50),
                    vehicle_id varchar(20),
                    stop_sequence smallint,
                    stop_id varchar(50),
                    delay int,
                    time int,

                    PRIMARY KEY (vehicle_id),
                    FOREIGN KEY (trip_id) REFERENCES trips(trip_id)
);

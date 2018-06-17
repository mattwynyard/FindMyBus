create table positions (
                    trip_id varchar(50),
                    route_id varchar(50),
                    start_time time,
                    schedule_relationship smallint,
                    vehicle_id varchar(20),
                    latitude real,
                    longitude real,
                    bearing smallint,
                    occupancy_status smallint,

                    PRIMARY KEY (vehicle_id),
                    FOREIGN KEY (trip_id) REFERENCES trips (trip_id)
);

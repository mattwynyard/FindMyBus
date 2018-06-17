create table trips (
                    trip_id varchar(50),
                    route_id varchar(50),
                    service_id varchar(50),
                    trip_headsign varchar(50),
                    direction_id smallint,
                    block_id varchar(50),
                    shape_id varchar(50),
                    trip_short_name varchar(50),
                    trip_type varchar(50),

                    PRIMARY KEY (trip_id),
                    FOREIGN KEY (route_id) REFERENCES routes (route_id)
);

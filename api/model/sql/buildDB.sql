DROP TABLE IF EXISTS routes, trips, trip_updates, positions;

create table routes (
                    route_id varchar(50),
                    agency_id varchar(50),
                    route_short_name varchar(20),
                    route_long_name varchar(100),
                    route_desc varchar(50),
                    route_type smallint,
                    route_url varchar(50),
                    route_color varchar(20),
                    route_text_color varchar(20),
                    PRIMARY KEY (route_id)
);

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

create table positions (
                    trip_id varchar(50),
                    route_id varchar(50),
                    start_time time,
                    schedule_relationship smallint,
                    vehicle_id varchar(20),
                    latitude real,
                    longitude real,
                    bearing real,
                    occupancy_status smallint,

                    PRIMARY KEY (vehicle_id),
                    FOREIGN KEY (trip_id) REFERENCES trips (trip_id)
);

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
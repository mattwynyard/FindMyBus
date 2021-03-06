create table stops (
                trip_id varchar(50),
                stop_id varchar(50),
                stop_name varchar(100),
                stop_desc varchar(100),
                stop_lat real,
                stop_lon real,
                stop_url varchar(100),
                stop_code varchar(20),
                stop_street varchar(50),
                stop_region varchar(50),
                stop_city varchar(50),
                stop_postcode varchar(20),
                stop_country varchar(30),
                location_type smallint,
                parent_station varchar(50),
                stop_timezone varchar(50),
                wheelchair_boarding varchar(20),
                direction varchar(20),
                postion varchar(20),
        
                PRIMARY KEY (stop_id),
                FOREIGN KEY (trip_id) REFERENCES trips (trip_id)
);


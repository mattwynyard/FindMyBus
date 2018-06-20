create table shapes (
                    shape_id varchar(50),
                    shape_t_lat real,
                    shape_pt_long real,
                    shape_pt_sequence int,
                    shape_dist_traveled real,
                    trip_id varchar(50),

                    PRIMARY KEY (shape_id, shape_pt_sequence),
                    FOREIGN KEY (trip_id) REFERENCES trips (trip_id)
);
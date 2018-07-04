create table shapes (
                    shape_id varchar(50),
                    shape_pt_lat real,
                    shape_pt_long real,
                    shape_pt_sequence int,
                    shape_dist_traveled real,
                    route_id varchar(50),

                    PRIMARY KEY (shape_id, shape_pt_sequence),
                    FOREIGN KEY (route_id) REFERENCES routes (route_id)
);
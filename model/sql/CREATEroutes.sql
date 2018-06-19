drop table if exists routes;

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

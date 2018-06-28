copy (Select distinct route_id, shape_id from trips) 
to '/Users/matt/FindMyBus/api/model/sql/shape.csv' With CSV DELIMITER ',';
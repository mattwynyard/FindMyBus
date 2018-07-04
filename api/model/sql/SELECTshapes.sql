copy (Select distinct route_id, shape_id from trips) 
to '/Users/matt/FindMyBus/api/model/json/shapes.csv' With CSV DELIMITER ',';
SELECT p.vehicle_id, p.latitude, p.longitude
FROM routes r, positions p
WHERE r.route_id = p.route_id and r.route_short_name='595';
copy(
SELECT p.vehicle_id, p.latitude, p.longitude, p.bearing
FROM routes r, positions p
WHERE r.route_id = p.route_id and r.route_short_name='595')
to '/Users/matt/FindMyBus/positions.csv' With CSV DELIMITER ',';
--SELECT r.route_short_name, p.vehicle_id, p.latitude, p.longitude, p.bearing, t.direction_id
--FROM routes r, positions p, trips t
--WHERE r.route_id = p.route_id and p.trip_id = t.trip_id and r.route_short_name='112';
copy (
SELECT json_agg(row_to_json(t))
FROM (SELECT r.route_short_name, p.vehicle_id, p.latitude, p.longitude, p.bearing, t.direction_id
FROM routes r, positions p, trips t
WHERE r.route_id = p.route_id and p.trip_id = t.trip_id) t --and t.direction_id=)
)
to '/Users/matt/FindMyBus/bus.json';
SELECT p.vehicle_id, p.latitude, p.longitude, p.bearing, t.direction_id
FROM routes r, trips t, positions p
WHERE r.route_id=t.route_id and t.trip_id = p.trip_id and r.route_short_name='112';

--and t.direction_id = 0 
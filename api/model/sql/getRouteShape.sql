copy (
SELECT json_agg(row_to_json(j))
FROM (SELECT r.route_short_name, s.shape_id, s.shape_pt_sequence, s.shape_pt_lat, s.shape_pt_lon
FROM shapes s, routes r
WHERE s.route_id = r.route_id
ORDER BY s.shape_id, s.shape_pt_sequence) j
)
to '/Users/matt/FindMyBus/api/model/json/shape_shortname.json';
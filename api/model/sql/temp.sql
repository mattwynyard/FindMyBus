select count(distinct shape_id) from
(
    select t.route_id, t.shape_id 
    from trips as t 
    group by trip_id) as x;
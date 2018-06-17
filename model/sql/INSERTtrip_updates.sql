create temporary table temp_json (values text);
copy temp_json from '/Users/matt/FindMyBus/positions.json';

insert into positions 

select  values->'trip'->>'trip_id' as trip_id,
        values->'trip'->>'route_id' as route_id,
        (CAST(values->'trip'->>'start_time' as time)) as start_time,
        (CAST(values->'trip'->>'schedule_relationship' as integer)) as schedule_realtionship,
        values->'vehicle'->>'id' as vehicle_id,
        (CAST(values->'position'->>'latitude' as real)) as latitude,
        (CAST(values->'position'->>'longitude' as real)) as longitude

from   (
           select json_array_elements(replace(values,'\','\\')::json) as values 
           from   temp_json
       ) a;

drop table temp_json;
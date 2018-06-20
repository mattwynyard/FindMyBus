--delete from trip_updates;
--delete from positions;
--delete from trips;

create temporary table temp_json (values text);
copy temp_json from '/Users/matt/FindMyBus/api/model/json/trips.json';

-- uncomment the line above to insert records into your table
insert into trips

select  
        values->>'trip_id' as trip_id,
        values->>'route_id' as route_id,
        values->>'service_id' as service_id,
        values->>'trip_headsign' as trip_headsign,
        (CAST(values->>'direction_id' AS integer))as direction_id,
        values->>'block_id' as block_id,
        values->>'shape_id' as shape_id,
        values->>'trip_short_name' as trip_short_name,
        values->>'trip_type' as trip_type

from   (
           select json_array_elements(replace(values,'\','\\')::json) as values 
           from   temp_json
       ) a;

drop table temp_json;

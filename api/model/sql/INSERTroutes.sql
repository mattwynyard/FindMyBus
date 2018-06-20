delete from trip_updates;
delete from positions;
delete from trips;
delete from routes;

create temporary table temp_json (values text);
copy temp_json from '/Users/matt/FindMyBus/api/model/json/routes.json';

-- uncomment the line below to insert records into your table
insert into routes 

select values->>'route_id' as route_id,
       values->>'agency_id' as agency_id,
       values->>'route_short_name' as route_short_name,
       values->>'route_long_name' as  route_long_name,
       values->>'route_desc' as  route_desc,
       (CAST(values->>'route_type' AS integer)) AS route_type,
       values->>'route_url' as route_url,
       values->>'route_color' as  route_color,
       values->>'route_text_color' as route_text_color
from   (
           select json_array_elements(replace(values,'\','\\')::json) as values 
           from   temp_json
       ) a;

drop table temp_json;

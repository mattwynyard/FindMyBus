create temporary table temp_json (values text);
copy temp_json from '/Users/matt/FindMyBus/trip_updates.json';

--nsert into routes 

select values->>'id'->'trip_update'->'trip' as id

from   (
           select json_array_elements(replace(values,'\','\\')::json) as values 
           from   temp_json
       ) a;

drop table temp_json;
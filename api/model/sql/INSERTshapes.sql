
delete from shapes;

DO $$
declare
    n INTEGER := 1;
    prefix TEXT := '/Users/matt/FindMyBus/api/model/json/filechunks/shapes_routes';
    i TEXT := NULL;
    file_path TEXT := NULL;

BEGIN
LOOP 
EXIT WHEN n > 166;
i := CAST(n as TEXT);
file_path := prefix || i || '.json';
n := n + 1;

create temporary table temp_json (values text);
EXECUTE 'copy temp_json from '|| quote_literal(file_path);
insert into shapes

select  values->>'shape_id' as shape_id,
        (CAST(values->>'shape_pt_lat' as real)) as shape_pt_lat,
        (CAST(values->>'shape_pt_lon' as real)) as shape_pt_lon,
        (CAST(values->>'shape_pt_sequence' as integer)) as shape_pt_sequence,
        (CAST(values->>'shape_dist_traveled' as real)) as shape_dist_traveled,
        values->>'route_id' as route_id

from   (
        select json_array_elements(replace(values,'\','\\')::json) as values 
        from temp_json
       ) a;
drop table temp_json;
END LOOP; 
END $$;
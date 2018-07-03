#!/bin/bash
psql findmybus -f /Users/matt/FindMyBus/model/sql/buildDB.sql
echo "rebuilt db"
echo "client running...."
node ./node/client.js routes
echo "routes:"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/INSERTroutes.sql
node ./node/client.js trips
echo "trips:"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/INSERTtrips.sql
node ./node/client.js positions
echo "positions:"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/INSERTpositions.sql
echo "shapes:"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/SELECTshapes.sql
echo "updating locations"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/findBus.sql

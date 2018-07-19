#!/bin/bash
echo "client running...."
if [ uname = "Linux" ]
then
    nodejs ./node/client.js routes
else
    node ./node/client.js routes
fi
echo "routes:"
psql findmybus -f ./api/model/sql/INSERTroutes.sql
if [ uname = "Linux" ]
then
    nodejs ./node/client.js trips
else
    node ./node/client.js trips
fi
echo "trips:"
psql findmybus -f ./api/model/sql/INSERTtrips.sql
if [ uname = "Linux" ]
then
    nodejs ./node/client.js positions
else
    node ./node/client.js positions
fi
echo "positions:"
psql findmybus -f ./api/model/sql/INSERTpositions.sql
echo "shapes:"
psql findmybus -f ./api/model/sql/SELECTshapes.sql
echo "updating locations"
psql findmybus -f ./api/model/sql/findBus.sql


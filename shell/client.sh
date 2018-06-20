#!/bin/bash
echo "client running...."
node client.js routes
echo "routes:"
psql findmybus -f /Users/matt/FindMyBus/model/sql/INSERTroutes.sql
node client.js trips
echo "trips:"
psql findmybus -f /Users/matt/FindMyBus/model/sql/INSERTtrips.sql
node client.js positions
echo "positions:"
psql findmybus -f /Users/matt/FindMyBus/model/sql/INSERTpositions.sql


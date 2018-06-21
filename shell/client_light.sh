#!/bin/bash
echo "client running...."
node ./node/client.js positions
echo "positions:"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/INSERTpositions.sql
echo "updating locations"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/findBus.sql


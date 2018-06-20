#!/bin/bash
echo "client running...."
node ./node/client.js positions
echo "positions:"
psql findmybus -f /Users/matt/FindMyBus/api/model/sql/INSERTpositions.sql


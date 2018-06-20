#!/bin/bash
echo "client running...."
node client.js positions
echo "positions:"
psql findmybus -f /Users/matt/FindMyBus/model/sql/INSERTpositions.sql


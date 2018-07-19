#!/bin/bash
while [ 1 = 1 ]; do
    echo "client running...."
    if [ uname = "Linux" ]
    then
        nodejs ./node/client.js positions
    else
        node ./node/client.js positions
    fi
    echo "positions:"
    psql findmybus -f ./api/model/sql/INSERTpositions.sql
    echo "updating locations"
    psql findmybus -f ./api/model/sql/findBus.sql
    sleep 10
done


#!/bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"space":0, "taken": false, "address": "some address", "office": '"$1"' }' \
  http://localhost:8080/office/apartment/add

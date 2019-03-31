#!/bin/bash

# https://stackoverflow.com/questions/7172784/how-to-post-json-data-with-curl-from-terminal-commandline-to-test-spring-rest

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"from_office":1, "to_office":2, "leaving_date": "2012-04-23T18:25:43.511Z", "returning_date": "2012-04-23T22:25:43.511Z", "price": 20, "employees": [5] }' \
  http://localhost:8080/trip/add


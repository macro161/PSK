#!/bin/bash

# https://stackoverflow.com/questions/7172784/how-to-post-json-data-with-curl-from-terminal-commandline-to-test-spring-rest

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"city":"Vilnius","address":"Vasario g. 1"}' \
  http://localhost:8080/office/add


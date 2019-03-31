#!/bin/bash

if [ "$#" -eq 2 ]; then
	curl --silent \
		--header "Content-Type: application/json" \
		--request PUT \
		--data '{ "address":"'"$2"'"}' \
		http://localhost:8080/office/edit/$1 | python -mjson.tool
fi;

if [ "$#" -eq 3 ]; then
	curl --silent \
	  --header "Content-Type: application/json" \
	  --request PUT \
	  --data '{ "city":"'"$2"'", "address":"'"$3"'"}' \
	  http://localhost:8080/office/edit/$1 | python -mjson.tool
fi;


if [ "$#" -eq 3 ]; then
	curl --silent \
	  --header "Content-Type: application/json" \
	  --request PUT \
	  --data '{ "city":"'"$2"'", "address":"'"$3"'"}' \
	  http://localhost:8080/office/edit/$1 | python -mjson.tool
fi;

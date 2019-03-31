#!/bin/bash

curl --silent http://localhost:8080/trip/ | python -mjson.tool

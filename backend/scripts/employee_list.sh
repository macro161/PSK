#!/bin/bash

curl --silent http://localhost:8080/employee/ | python -mjson.tool

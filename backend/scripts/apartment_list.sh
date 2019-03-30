#!/bin/bash

curl --silent http://localhost:8080/office/apartment/ | python -mjson.tool

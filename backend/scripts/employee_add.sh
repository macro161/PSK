#!/bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"name":"andrius", "surname":"bentkus", "city":"Vilnius", "email":"andrius.bentkus@gmail.com", "password": "password" }' \
  http://localhost:8080/employee/add


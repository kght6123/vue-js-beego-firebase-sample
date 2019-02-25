#!/bin/bash
cd backend
bee run -downdoc=true -gendoc=true
cd -
cd frontend
yarn run serve
cd -
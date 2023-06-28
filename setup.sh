#!/bin/bash

# Step 1
cd package
npm i
npm run build
npm link
cd ..

# Step 2
cd sandbox
npm i
npm link ctm-design-system
cd ..

# Step 3
cd package
npm link ../sandbox/node_modules/react
cd ..

# Step 4
cd sandbox
npm run start
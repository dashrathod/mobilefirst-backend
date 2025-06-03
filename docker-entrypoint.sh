#!/bin/sh

# Wait for MySQL to be ready
# echo "Waiting 5 seconds before running migration..."
# sleep 1

echo "------------------ starting migration... ----------------------"
# Run migrations
npx sequelize-cli db:migrate

# Start the app
npm start

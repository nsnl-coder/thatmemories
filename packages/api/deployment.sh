rm -rf packages/client
rm -rf packages/admin

yarn install
yarn build:yup
yarn build:api

add .env.prod file
change node_env to production

yarn start:api
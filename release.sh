git pull
yarn
cp -rf ScrollNumber.d.ts node_modules/antd/lib/badge/ScrollNumber.d.ts
cp -rf redux-action.type.d.ts node_modules/react-jhipster/lib/src/type/redux-action.type.d.ts
yarn run webpack:prod
#sh copy.sh

rm server.tar

cp package.json ./dist/

tar -zcf server.tar dist/

scp server.tar dorian@zwerque.fr:/home/dorian/shop/back

ssh -t dorian@zwerque.fr "cd shop/back; rm -rf ./server; tar -xf server.tar; mv dist/ server; cp .env ./server"

ssh -t dorian@zwerque.fr "cd shop/back; ./start.sh"


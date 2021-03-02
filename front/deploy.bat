rm www.tar

tar -zcf www.tar build/

scp www.tar dorian@zwerque.fr:/home/dorian/shop

ssh -t dorian@zwerque.fr "cd shop; tar -xf www.tar; sudo rm -rf www; mv build/ www"

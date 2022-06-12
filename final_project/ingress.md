```
user@ubuntu:~/Desktop/ingress$ kubectl expose deployment tomcat6 --port=80 --target-port=80 --type=NodePort
service/tomcat6 exposed
```
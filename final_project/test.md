## 安裝minikube
```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb
```
## 設定群組
```
sudo groupadd docker
sudo usermod -aG docker $USER
- Re-Login or Restart the Server
```
## 啟動
```
user@ubuntu:~/Desktop/kube_yaml$ minikube start
😄  minikube v1.25.2 on Ubuntu 20.04
✨  Using the docker driver based on existing profile

🧯  The requested memory allocation of 1941MiB does not leave room for system overhead (total system memory: 1941MiB). You may face stability issues.
💡  Suggestion: Start minikube with less memory allocated: 'minikube start --memory=1941mb'

👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🏃  Updating the running docker "minikube" container ...
🐳  Preparing Kubernetes v1.23.3 on Docker 20.10.12 ...
    ▪ kubelet.housekeeping-interval=5m
🔎  Verifying Kubernetes components...
    ▪ Using image k8s.gcr.io/ingress-nginx/controller:v1.1.1
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
    ▪ Using image kubernetesui/dashboard:v2.3.1
    ▪ Using image kubernetesui/metrics-scraper:v1.0.7
🔎  Verifying ingress addon...
🌟  Enabled addons: default-storageclass, storage-provisioner, ingress, dashboard
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
```
## 設定檔
```
user@ubuntu:~/Desktop/kube_yaml$ cat nginx_dep.yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  namespace: dev
spec:
  replicas: 4
  selector:
    matchLabels:
      app: nginx-pod
  template:
     metadata:
       labels:
         app: nginx-pod
     spec:
       containers:
       - name: nginx
         image: nginx:1.17.1
         ports:
         - containerPort: 80
```
```
user@ubuntu:~/Desktop/kube_yaml$ cat nginx_svc.yaml 
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: dev
spec:
  selector:
    app: nginx-pod
  clusterIP: None
  type: ClusterIP
  ports:
  - port: 80
    targetPort: 80
```
```
user@ubuntu:~/Desktop/kube_yaml$ cat tomcat_dep.yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tomcat-deployment
  namespace: dev
spec:
  replicas: 3
  selector:
    matchLabels:
      app: tomcat-pod
  template:
    metadata:
      labels:
        app: tomcat-pod
    spec:
      containers:
      - name: tomcat
        image: tomcat:8.5-jre10-slim
        ports:
        - containerPort: 8080
```
```
user@ubuntu:~/Desktop/kube_yaml$ cat tomcat_svc.yaml 
apiVersion: v1
kind: Service
metadata:
  name: tomcat-service
  namespace: dev
spec:
  selector:
    app: tomcat-pod
  clusterIP: None
  type: ClusterIP
  ports:
  - port: 8080
    targetPort: 8080
```
```
user@ubuntu:~/Desktop/kube_yaml$ cat ingress-http.yaml 
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-http
  namespace: dev
spec:
  rules:
  - host: nginx.nick.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port: 
              number: 80
  - host: tomcat.nick.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: tomcat-service
            port: 
              number: 8080
```
## 部屬設定檔
```
user@ubuntu:~/Desktop/kube_yaml$ kubectl create ns dev
namespace/dev created
user@ubuntu:~/Desktop/kube_yaml$ kubectl apply -f nginx_dep.yaml 
deployment.apps/nginx-deployment created
user@ubuntu:~/Desktop/kube_yaml$ kubectl apply -f nginx_svc.yaml 
service/nginx-service created
user@ubuntu:~/Desktop/kube_yaml$ kubectl apply -f tomcat_svc.yaml 
service/tomcat-service created
user@ubuntu:~/Desktop/kube_yaml$ kubectl apply -f tomcat_dep.yaml 
deployment.apps/tomcat-deployment created
user@ubuntu:~/Desktop/kube_yaml$ kubectl apply -f ingress-http.yaml 
ingress.networking.k8s.io/ingress-http created
user@ubuntu:~/Desktop/kube_yaml$ kubectl get all -n dev
NAME                                     READY   STATUS    RESTARTS   AGE
pod/nginx-deployment-6756f95949-7bcqq    1/1     Running   0          37s
pod/nginx-deployment-6756f95949-jpjgh    1/1     Running   0          37s
pod/nginx-deployment-6756f95949-wntv9    1/1     Running   0          37s
pod/nginx-deployment-6756f95949-xtb72    1/1     Running   0          37s
pod/tomcat-deployment-76bccfb47c-c8gkk   1/1     Running   0          23s
pod/tomcat-deployment-76bccfb47c-dq9sq   1/1     Running   0          23s
pod/tomcat-deployment-76bccfb47c-hbhmb   1/1     Running   0          23s

NAME                     TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
service/nginx-service    ClusterIP   None         <none>        80/TCP     32s
service/tomcat-service   ClusterIP   None         <none>        8080/TCP   26s

NAME                                READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/nginx-deployment    4/4     4            4           37s
deployment.apps/tomcat-deployment   3/3     3            3           23s

NAME                                           DESIRED   CURRENT   READY   AGE
replicaset.apps/nginx-deployment-6756f95949    4         4         4       37s
replicaset.apps/tomcat-deployment-76bccfb47c   3         3         3       23s
```

```
kubectl exec -it pod/nginx-deployment-6756f95949-7bcqq -n dev /bin/bash
echo "n1" > /usr/share/nginx/html/index.html
```

## minikube
```
route add -net 192.168.0.0 netmask 255.255.0.0 dev ens37
```

## ubuntu
```
user@ubuntu:~/Desktop/kube_yaml$ minikube ip
192.168.49.2
user@ubuntu:~/Desktop/kube_yaml$ cat /etc/hosts
127.0.0.1	localhost
127.0.1.1	ubuntu
192.168.49.2  	nginx.nick.com
192.168.49.2    tomcat.nick.com
```

## win10
```
route add 192.168.49.0 mask 255.255.255.0 192.168.228.158
```

```
user@ubuntu:~/Desktop/kube_yaml$ kubectl exec -it pod/nginx-deployment-6756f95949-7bcqq -n dev /bin/bash
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
root@nginx-deployment-6756f95949-7bcqq:/# kubectl exec -it pod/nginx-deployment-6756f95949-7bcqq -n dev /bin/bash
root@nginx-deployment-6756f95949-7bcqq:/# exit
exit
user@ubuntu:~/Desktop/kube_yaml$ kubectl exec -it pod/nginx-deployment-6756f95949-jpjgh -n dev /bin/bash
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
root@nginx-deployment-6756f95949-jpjgh:/# echo "n2" > /usr/share/nginx/html/index.html
root@nginx-deployment-6756f95949-jpjgh:/# exit
exit
user@ubuntu:~/Desktop/kube_yaml$ kubectl exec -it pod/nginx-deployment-6756f95949-wntv9 -n dev /bin/bash
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.
root@nginx-deployment-6756f95949-wntv9:/# echo "n3" > /usr/share/nginx/html/index.html
root@nginx-deployment-6756f95949-wntv9:/# exit
exit
```
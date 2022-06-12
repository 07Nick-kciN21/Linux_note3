## install
```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube_latest_amd64.deb
sudo dpkg -i minikube_latest_amd64.deb
```

minikube start --force --driver=docker
```
root@ubuntu:/home/user/Desktop# minikube start --force --driver=docker
😄  minikube v1.25.2 on Ubuntu 20.04
❗  minikube skips various validations when --force is supplied; this may lead to unexpected behavior
✨  Using the docker driver based on existing profile
🛑  The "docker" driver should not be used with root privileges.
💡  If you are running minikube within a VM, consider using --driver=none:
📘    https://minikube.sigs.k8s.io/docs/reference/drivers/none/
💡  Tip: To remove this root owned cluster, run: sudo minikube delete

🧯  The requested memory allocation of 1941MiB does not leave room for system overhead (total system memory: 1941MiB). You may face stability issues.
💡  Suggestion: Start minikube with less memory allocated: 'minikube start --memory=1941mb'

👍  Starting control plane node minikube in cluster minikube
🚜  Pulling base image ...
🔄  Restarting existing docker container for "minikube" ...
🐳  Preparing Kubernetes v1.23.3 on Docker 20.10.12 ...
    ▪ kubelet.housekeeping-interval=5m
🔎  Verifying Kubernetes components...
    ▪ Using image gcr.io/k8s-minikube/storage-provisioner:v5
    ▪ Using image kubernetesui/dashboard:v2.3.1
    ▪ Using image kubernetesui/metrics-scraper:v1.0.7
🌟  Enabled addons: default-storageclass, storage-provisioner, dashboard
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default

```
```
sudo groupadd docker
sudo usermod -aG docker $USER
- Re-Login or Restart the Server
```
```
root@ubuntu:/home/user/Desktop# kubectl get nodes
NAME       STATUS   ROLES                  AGE     VERSION
minikube   Ready    control-plane,master   5d21h   v1.23.3
```
```
user@ubuntu:~/Desktop$ docker ps
CONTAINER ID   IMAGE                                 COMMAND                  CREATED         STATUS         PORTS                                                                                                                                  NAMES
bf836f652c70   gcr.io/k8s-minikube/kicbase:v0.0.30   "/usr/local/bin/entr…"   4 minutes ago   Up 4 minutes   127.0.0.1:49157->22/tcp, 127.0.0.1:49156->2376/tcp, 127.0.0.1:49155->5000/tcp, 127.0.0.1:49154->8443/tcp, 127.0.0.1:49153->32443/tcp   minikube
```
```
root@ubuntu:/home/user/Desktop# minikube status
minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured
```

```
user@ubuntu:~/Desktop$ kubectl get pod
No resources found in default namespace.
user@ubuntu:~/Desktop$ kubectl get services
NAME         TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   23m
```

```
user@ubuntu:~/Desktop$ kubectl create deployment nginx-depl --image=nginx
deployment.apps/nginx-depl created
user@ubuntu:~/Desktop$ kubectl get deployment
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
nginx-depl   1/1     1            1           58s
user@ubuntu:~/Desktop$ kubectl get replicaset
NAME                    DESIRED   CURRENT   READY   AGE
nginx-depl-5ddc44dd46   1         1         1       2m12s
user@ubuntu:~/Desktop$ kubectl get pod
NAME                          READY   STATUS    RESTARTS   AGE
nginx-depl-5ddc44dd46-rc29s   1/1     Running   0          3m13s

```

```
user@ubuntu:~/Desktop$ kubectl get pod
NAME                          READY   STATUS              RESTARTS   AGE
nginx-depl-5ddc44dd46-rc29s   1/1     Running             0          14m
nginx-depl-7d459cf5c8-86hvd   0/1     ContainerCreating   0          11s
user@ubuntu:~/Desktop$ kubectl get pod
NAME                          READY   STATUS              RESTARTS   AGE
nginx-depl-5ddc44dd46-rc29s   1/1     Running             0          14m
nginx-depl-7d459cf5c8-86hvd   0/1     ContainerCreating   0          15s
user@ubuntu:~/Desktop$ kubectl get pod
NAME                          READY   STATUS        RESTARTS   AGE
nginx-depl-5ddc44dd46-rc29s   1/1     Terminating   0          14m
nginx-depl-7d459cf5c8-86hvd   1/1     Running       0          21s
user@ubuntu:~/Desktop$ kubectl get pod
NAME                          READY   STATUS    RESTARTS   AGE
nginx-depl-7d459cf5c8-86hvd   1/1     Running   0          25s
```
```
user@ubuntu:~/Desktop$ kubectl get pod
NAME                          READY   STATUS    RESTARTS   AGE
mongo-depl-85ddc6d66-zz4wn    1/1     Running   0          3m
nginx-depl-7d459cf5c8-86hvd   1/1     Running   0          6m
user@ubuntu:~/Desktop$ kubectl exec -it mongo-depl-85ddc6d66-zz4wn -- bin/bash
root@mongo-depl-85ddc6d66-zz4wn:/# ls
bin   dev			  home	      lib32   media  proc  sbin  tmp
boot  docker-entrypoint-initdb.d  js-yaml.js  lib64   mnt    root  srv	 usr
data  etc			  lib	      libx32  opt    run   sys	 var
```
```
user@ubuntu:~/Desktop$ kubectl delete deployment mongo-depl
deployment.apps "mongo-depl" deleted
user@ubuntu:~/Desktop$ kubectl get pod
NAME                          READY   STATUS    RESTARTS   AGE
nginx-depl-7d459cf5c8-86hvd   1/1     Running   0          12m
user@ubuntu:~/Desktop$ kubectl get replicaset
NAME                    DESIRED   CURRENT   READY   AGE
nginx-depl-5ddc44dd46   0         0         0       27m
nginx-depl-7d459cf5c8   1         1         1       12m
```

```
user@ubuntu:~/Desktop$ kubectl get pod
NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-9456bbbf9-gksgs   1/1     Running   0          6m55s
nginx-deployment-9456bbbf9-p5xq2   1/1     Running   0          2s
user@ubuntu:~/Desktop$ kubectl get deployment
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   2/2     2            2           7m19s
```

## namespace


## ingress
負責管理外部訪問的流量以及提供url和port

## ingress controller
```
user@ubuntu:~/Desktop$ minikube addons enable ingress
    ▪ Using image k8s.gcr.io/ingress-nginx/controller:v1.1.1
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
    ▪ Using image k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
🔎  Verifying ingress addon...
🌟  The 'ingress' addon is enabled
```
```
user@ubuntu:~/Desktop$ kubectl get pods -n ingress-nginx
NAME                                       READY   STATUS      RESTARTS   AGE
ingress-nginx-admission-create-ptck5       0/1     Completed   0          5m45s
ingress-nginx-admission-patch-lr6vm        0/1     Completed   1          5m45s
ingress-nginx-controller-cc8496874-t858n   1/1     Running     0          5m45s
```
```
user@ubuntu:~/Desktop$ kubectl get service -n ingress-nginx
NAME                                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             NodePort    10.108.219.103   <none>        80:30135/TCP,443:31167/TCP   29h
ingress-nginx-controller-admission   ClusterIP   10.96.234.147    <none>        443/TCP                      29h
```
## kube dashboard
為dashboard提供外部訪問
```

user@ubuntu:~/Desktop$ kubectl get all -n kubernetes-dashboard
NAME                                            READY   STATUS    RESTARTS        AGE
pod/dashboard-metrics-scraper-58549894f-qdv84   1/1     Running   2 (14h ago)     17h
pod/kubernetes-dashboard-ccd587f44-bjtpz        1/1     Running   3 (7m51s ago)   17h

NAME                                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
service/dashboard-metrics-scraper   ClusterIP   10.102.230.22   <none>        8000/TCP   17h
service/kubernetes-dashboard        ClusterIP   10.105.219.81   <none>        80/TCP     17h

NAME                                        READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/dashboard-metrics-scraper   1/1     1            1           17h
deployment.apps/kubernetes-dashboard        1/1     1            1           17h

NAME                                                  DESIRED   CURRENT   READY   AGE
replicaset.apps/dashboard-metrics-scraper-58549894f   1         1         1       17h
replicaset.apps/kubernetes-dashboard-ccd587f44        1         1         1       17h
```

```
user@ubuntu:~/Desktop/kube_yaml$ cat dashboard-ingress_2.yaml 
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  namespace: kubernetes-dashboard
spec:
  rules:
  - host: dashboard.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: kubernetes-dashboard
            port: 
              number: 80

```

## helm
多種服務的yaml檔可能只有微小的差異，使用helm

## Container and Pods


```
user@ubuntu:~/Desktop$ kubectl edit deployment nginx-deployment -n nginx
```
services = svc
```
user@ubuntu:~/Desktop/kube_yaml$ kubectl get pods -n dev
NAME                                 READY   STATUS    RESTARTS   AGE
nginx-deployment-6756f95949-hfttk    1/1     Running   0          2m16s
nginx-deployment-6756f95949-nl4l9    1/1     Running   0          2m16s
nginx-deployment-6756f95949-r5zxf    1/1     Running   0          2m16s
tomcat-deployment-76bccfb47c-4j89n   1/1     Running   0          51s
tomcat-deployment-76bccfb47c-ghzd8   1/1     Running   0          51s
tomcat-deployment-76bccfb47c-zxnrv   1/1     Running   0          51s
user@ubuntu:~/Desktop/kube_yaml$ vim nginx_svc.yaml
user@ubuntu:~/Desktop/kube_yaml$ kubectl create -f nginx_svc.yaml 
service/nginx-service created
user@ubuntu:~/Desktop/kube_yaml$ vim tomcat_svc.yaml
user@ubuntu:~/Desktop/kube_yaml$ kubectl create -f tomcat_svc.yaml 
service/tomcat-service created
user@ubuntu:~/Desktop/kube_yaml$ kubectl get svc -n dev
NAME             TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)    AGE
nginx-service    ClusterIP   None         <none>        80/TCP     38s
tomcat-service   ClusterIP   None         <none>        8080/TCP   11s
```

ingress = ing
```
user@ubuntu:~/Desktop/kube_yaml$ kubectl get ing ingress-http  -n dev
NAME           CLASS   HOSTS                            ADDRESS        PORTS   AGE
ingress-http   nginx   nginx.nick.com,tomcat.nick.com   192.168.49.2   80      2m44s
user@ubuntu:~/Desktop/kube_yaml$ kubectl get ingress ingress-http  -n dev
NAME           CLASS   HOSTS                            ADDRESS        PORTS   AGE
ingress-http   nginx   nginx.nick.com,tomcat.nick.com   192.168.49.2   80      3m
```
```
user@ubuntu:~/Desktop/kube_yaml$ kubectl describe ingress ingress-http -n dev
Name:             ingress-http
Labels:           <none>
Namespace:        dev
Address:          192.168.49.2
Ingress Class:    nginx
Default backend:  <default>
Rules:
  Host             Path  Backends
  ----             ----  --------
  nginx.nick.com   
                   /   nginx-service:80 (172.17.0.6:80,172.17.0.7:80,172.17.0.8:80)
  tomcat.nick.com  
                   /   tomcat-service:8080 (172.17.0.10:8080,172.17.0.11:8080,172.17.0.9:8080)
Annotations:       <none>
Events:
  Type    Reason  Age                   From                      Message
  ----    ------  ----                  ----                      -------
  Normal  Sync    3m43s (x2 over 4m7s)  nginx-ingress-controller  Scheduled for sync
```

我用minikube建立

route add 192.168.49.0 mask 255.255.255.0 192.168.228.158
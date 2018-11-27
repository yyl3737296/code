## 简介
&emsp;&emsp;此项目只是自己学习所有目标是一个后端支持多个终端，框架采用app:Weex; web:iView Admin; services:Egg.js+mysql+redis，目前只做了简单登录，以及后端接口权限限制

## services
token的生成采用jsonwebtoken，参考文献如下
https://blog.csdn.net/qq_39081974/article/details/81085717

启动前首先启动redis
```bush
redis-server.exe redis.windows.conf
```
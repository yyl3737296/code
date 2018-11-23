'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  generateToken(data, time) {
    const jwt = require('jsonwebtoken');
    const path = require('path');
    const fs = require('fs');

    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem'));//私钥
    let token = jwt.sign({
        data,
        exp: created + time
    }, cert, {algorithm: 'RS256'});

    return token;
  }

  // 验证token的方法，传入token，解密，验证是否过期
  verifyToken(token) {
    const jwt = require('jsonwebtoken');
    const path = require('path');
    const fs = require('fs');

    let cert = fs.readFileSync(path.join(__dirname, '../public/rsa_public_key.pem'));//公钥
    let res = ''
    try {
      let result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
      let {exp, iat} = result, current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
          res = result.data || {};
      }
    } catch (e) {
      console.log(e);
    }
    return res;
  }
  
  async login() {
    const { ctx, app } = this;
    const { userName, password } = ctx.request.body;

    let userInfo = await ctx.service.user.userSrvc.getUser(userName, password);
    if (userInfo) {
      let token = this.generateToken({id: userInfo.id}, 36000);
      ctx.body = {status: 200, token: token};
      app.redis.set(userName, token);
    }
    else {
      ctx.status = 401;
      ctx.body = {message: "用户名或密码错误！"};
    }

  }

  async getUserInfo() {
    const { ctx, app } = this;
    let token = ctx.request.header['x-access-token'];
    token = this.verifyToken(token);
    let {id} = token;

    let res = await ctx.service.user.userSrvc.getRole(id);
    let ids = [],
        access = [],
        _len = res.length;

    while( _len-- ) {
      let obj = res[_len];
      ids.push(obj.inter_id);
      access.push(obj.name);
    }

    let inter_name = await ctx.service.user.userSrvc.getInterface(ids.join(','));
    app.redis.set(id, JSON.stringify(inter_name));
    //console.log(JSON.stringify(inter_name)+'===============================');

    ctx.body = {
      name: 'super_admin',
      access: access,
      avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    };
  }

  async logout() {
    const { ctx, app } = this;
    let username = ctx.request.header['username']
    app.redis.set(username, '');
    ctx.body = {status: 200}
  }
}

module.exports = LoginController;
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
  async login() {
    const { ctx, app } = this;
    const { userName, password } = ctx.request.body;

    let userInfo = await ctx.service.user.userSrvc.getUser(userName, password);
    if (userInfo.length > 0) {
      let token = this.generateToken({_id: userInfo[0]._id}, 36000);
      ctx.body = {status: 200, token: token};
      app.redis.set(userName, token);
    }
    else {
      ctx.body = {status: 403, message: "用户名或密码错误！"};
    }

  }

  async getUserInfo() {
    const { ctx, app } = this;
    ctx.body = {status: 200, data: {
      name: 'super_admin',
      user_id: '1',
      access: ['super_admin', 'admin'],
      token: 'super_admin',
      avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
    }};
  }

  async logout() {
    const { ctx, app } = this;
    let username = ctx.request.header['username']
    app.redis.set(username, '');
    ctx.body = {status: 200}
  }
}

module.exports = LoginController;
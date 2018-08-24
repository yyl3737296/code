'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async generateToken(data, time) {
    const jwt = require('jsonwebtoken');
    const path = require('path');
    const fs = require('fs');

    let created = Math.floor(Date.now() / 1000);
    //let cert = fs.readFileSync(path.join(__dirname, '../../public/rsa_private_key.pem'));//私钥
    let token = jwt.sign({
        data,
        exp: created + time
    }, 'aaronyang', {algorithm: 'RS256'});
    return token;
  }
  async login() {
    const { ctx } = this;

    

    const { userName, password } = ctx.request.body;
    
    let token = this.generateToken({_id: '123123123123'}, 60000);

    console.log(token+'===================='+password);
    ctx.body = {success: 1, name: '123123123'};
  }
}

module.exports = LoginController;

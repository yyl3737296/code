'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    console.log('asdfasdfasdfasdfasdfasdfasdfasdf');
    ctx.body = {success: 1, name: '123123123'};
  }
}

module.exports = UserController;

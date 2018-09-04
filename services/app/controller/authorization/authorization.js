'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {
  async index() {
    const { ctx } = this;
    let data = await ctx.service.authorization.authorizationSrvc.get();
    this.ctx.body = {status: 200, data: data};
  }
  async create() {
    this.ctx.body = {status: 200, data: "12312312312312312"};
  }
  async update() {
    this.ctx.body = {status: 200, data: "put"};
  }
  async destroy() {
    this.ctx.body = {status: 200, data: "destroy"};
  }
}

module.exports = AuthController;

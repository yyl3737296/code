'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {
  async index() {
    const { ctx } = this;
    const { page, size, key, value } = ctx.query;
    let query = {};
    
    if ( value && key && key != '' && value != ' ') {
      query[key] = new RegExp(value);
    }

    let data = await ctx.service.organize.organizeSrvc.get(page, size, query);
    let total = await ctx.service.organize.organizeSrvc.getCount(query);

    ctx.body = {status: 200, data: data, total: total};
    
  }
  async create() {
    const { ctx } = this;
    let query = {'userName':'123123'};
    let total = await ctx.service.organize.organizeSrvc.getCount(query);
    if (total > 0) {

    }
    else {
      this.ctx.body = {status: 403, message: "组织登录名已经存在！"};
    }
    //this.ctx.body = {status: 200, data: "12312312312312312"};
  }
  async update() {
    this.ctx.body = {status: 200, data: "put"};
  }
  async destroy() {
    this.ctx.body = {status: 200, data: "destroy"};
  }
}

module.exports = AuthController;

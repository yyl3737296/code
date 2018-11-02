'use strict';

const Controller = require('egg').Controller;
class AuthController extends Controller {
  async index() {
    const { ctx } = this;
    const { page, size, key, value } = ctx.query;
    let query = '';
    
    if ( value && key && key != '' && value != ' ') {
      query = `where ${key} like \"%${value}%\"`;
    }

    let data = await ctx.service.organize.organizeSrvc.get(page, size, query);
    let total = await ctx.service.organize.organizeSrvc.getCount(query);

    ctx.body = {status: 200, data: data, total: total};
    
  }
  async create() {
    const { ctx } = this;
    const { user, password, name, description } = ctx.request.body;

    const total = await ctx.service.utilSrvc.get("user", {
      username:user
    });

    if (!total) {
      let res = await ctx.service.utilSrvc.insertOne('organize', {
        name: name,
        description: description
      });

      //// 判断插入成功
      //const insertSuccess = res.affectedRows === 1;
      console.log(JSON.stringify(res)+'++++++++++++++++++++++++++++++++');

      await ctx.service.utilSrvc.insertOne('user', {
        name: '超级管理员',
        username: user,
        password: password,
        orgid: res.id
      });

      this.ctx.body = {status: 200};
    }
    else {
      this.ctx.body = {status: 403, message: "组织登录名已经存在！"};
    }
  }
  async update() {
    this.ctx.body = {status: 200, data: "put"};
  }
  async destroy() {
    this.ctx.body = {status: 200, data: "destroy"};
  }
}

module.exports = AuthController;

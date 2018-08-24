'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  
  async login() {
    const { ctx } = this;
    const jwt = require('jsonwebtoken');
    const fs = require('fs');
    const path = require('path');
    const { userName, password } = ctx.request.body;


    console.log(userName+'===================='+password);
    ctx.body = {success: 1, name: '123123123'};
  }
}

module.exports = LoginController;

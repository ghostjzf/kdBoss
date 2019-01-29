const HOST = "http://172.25.6.158:9999";
// const HOST = "http://192.168.0.100:9999"; 

class Http {
  state = {
    method: {
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      DELETE: "DELETE"
    }
  }

  get = (url, data, config) => {
    return request(url, data, config, this.state.method.GET)
  }

  post = (url, data, config) => {
    return request(url, data, config, this.state.method.POST)
  }

  put = (url, data, config) => {
    return request(url, data, config, this.state.method.PUT)
  }

  delete = (url, data, config) => {
    return request(url, data, config, this.state.method.DELETE)
  }
}

const ERROR_MSG = {
  /* 网络类异常 */
  OFF_LINE: '抱歉，您貌似还没连接到网络，请检查网络连接',
  CANCEL: '抱歉，请求已取消',
  200: '抱歉，请求失败',
  401: '抱歉，您貌似还没有登录',
  403: '抱歉，您没有权限访问该页面',
  413: '抱歉，您上传文件太大',

  404: '抱歉，您访问的接口地址貌似不存在',
  500: '抱歉，当前服务器异常，请稍后再试',
  503: '抱歉，当前服务器异常，请稍后再试'
};

function request(url, data, config, method) {
  let header = {
    'content-type': 'application/x-www-form-urlencoded'
  }

  if (typeof config !== "undefined" && config.header) {
    Object.assign(header, config.header)
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + url,
      data: data,
      method: method,
      header: header,
      success: (res) => {
        const result = res.data;

        if (res.statusCode === 200) {
          if (result.code !== 200) {
            createError(reject, result);

            return
          }

          resolve(result)
        }
      },
      fail: (error) => {
        createError(reject, error)
      }
    })
  })
};

function createError(reject, error) {
  if (error) {
    reject(error)
  }
}

export default new Http();
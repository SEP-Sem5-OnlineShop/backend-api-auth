module.exports = {
  apps : [{
    name   : "OnTheWay",
    script : "./main.js",
    env: {
      "JWT_SECRET_ACCESS": "3e9650b78a0aefde38e5fddca60098d8f30ea480f77eb97dd5ddc3dc13b7e817a266edfbdc05278380b8d1ddb6da82b5",
      "JWT_SECRET_REFRESH": "0dbacfa2377770f7cab81a6296de53d09b4c4575234af9cd0a53b491bba0a0444f3e8a43e39f25304a7942e933b8f0a1",
      "JWT_EMAIL_SERVICE_SECRET": "690579ea626a93979e437cdcd1225b6bae77aa93d36fb5220de2dff32ba27750f41acc1e943a6e95855b3aed52743577",
      "JWT_RESET_PASS_SECRET": "81063540f947ec4f95b8ef81c35f519d837ce75fb55aa449a9a55793f075cb2fe920c79109444445cf51d91cd34f9786",
      "JWT_EXP_TIME_ACCESS": "15s",
      "JWT_EXP_TIME_REFRESH": "24h",
      "JWT_EXP_TIME_EMAIL_SERVICE": "24h",
      "JWT_EXP_TIME_RESET_PASS": "5m",
      "PORT":"80",
      "DB_NAME": "online_shop_db",
      "DB_USER": "admin",
      "DB_PASSWORD": "SPHS41nip3XYHyFB",
      "EMAIL_SERVICE_ADDRESS": "ontheway.sep@gmail.com",
      "EMAIL_SERVICE_REFRESH_TOKEN": "1//04W4y7vjglTgXCgYIARAAGAQSNwF-L9Ir7CLNIPnzaBsPV8naGV_RH-_nqlPUEfoHs_beeNHAKqaR_CIG1WLRD_fYSFKuPn5pS_Y",
      "EMAIL_SERVICE_CLIENT_SECRET": "xJbgaQiiJqpSAllRHcBHPSe-",
      "EMAIL_SERVICE_CLIENT_ID": "1071300868663-ho9hnf90kls8t675k4jba76ufit1oekg.apps.googleusercontent.com",
      "EMAIL_SERVICE_REDIRECT_URL": "https://developers.google.com/oauthplayground"
    }
  }]
}

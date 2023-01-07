<template>
  <div class="hello">
    <div>一键补日报</div>
    <br>
    <button @click="star1">执行一次</button>
    <button @click="star">开始</button>
    <button @click="stop">停止</button>
  </div>
</template>

<script>
import AES from '../components/aes'  // 需要封装的，AES.js封装文件在后面
import md5 from 'js-md5'

export default {
  data() {
    return {
      phone: '', //手机号
      t: '', // 加密时间戳
      passworld: '', // 密码
      token: "", // token
      userId: '',
      jrDate: '', // 今天的时间
      timeOut: '', // 日报定时器
      sign: '', // 请求的sign
      ms: "12", // 默认时间
      title: '日报' // 日报标题
    }
  },
  mounted() {
  },
  updated() {
  },
  methods: {
    getAES() {
      // 账号加密
      let iphone = AES.getAES('15579742513')
      this.phone = iphone
      console.log('账号----------' + iphone);
      // 时间戳加密
      let date = new Date()
      let time = date.getTime()
      let t = AES.getAES(time)
      this.t = t
      console.log('时间戳-------' + t);
      // 密码加密
      let passworld = AES.getAES('Hf123456')
      this.passworld = passworld
      console.log('密码--------' + passworld);
    },
    // 解析sign
    getMd5() {
      let uid = this.userId;
      let pid = 'f554902da5fb17f296d5f8fb3f8bc008';
      let d = 'day'
      let y = '3478cbbc33f84bd00d75d7dfa69e0daa'
      let s = uid + d + pid + this.title + y
      console.log(s);
      this.sign = md5(s)
      console.log(md5(s));
    },
    // 登录
    getajax() {
      this.$ajax({
        url: "https://api.moguding.net:9000/session/user/v3/login",
        methods: "POST",
        header: {
          'content-type': 'application/json;charset=UTF-8',
        },
        data: {
          "version": "5.3.0",
          "password": this.passworld,
          "loginType": "android",
          "device": "android",
          "t": this.t,
          "phone": this.phone,
          "uuid": "",
        },
      }).then((res) => {
        console.log(res);
        this.token = res.data.token
        this.userId = res.data.userId
        this.getMd5()

      });
    },

    getdata() {
      var date = new Date();
      var y = date.getFullYear()
      var d = date.getDate();
      d <= 9 ? d = '0' + d : d = d + 0;
      var m = date.getMonth() + 1;
      m <= 9 ? m = '0' + m : m = m + 0;
      // 保存格式
      parseInt(this.ms) <= 9 ? this.ms = '0' + this.ms : this.ms = this.ms + 0;

      this.jrDate = `${y}-${m}-${d} 00:00:00 00:00:00` // 系统返回当前时间
      console.log(this.jrDate);
    },

    // 日报
    getRb() {

      this.$ajax({
        url: "https://api.moguding.net:9000/practice/paper/v4/save",
        methods: "POST",
        data: {
          "content": "又是开心的工作了一天happyday",
          "imageList": [],
          "planId": "f554902da5fb17f296d5f8fb3f8bc008",
          "reportTime": this.jrDate,
          "reportType": "day",
          "t": this.t,
          "title": this.title,
        },
        headers: {
          "sign": this.sign,
          'authorization': this.token,
        }
      }).then((res) => {
        console.log(res);
      });
    },

    // 执行
    getPush() {
      this.getAES()
      this.getajax()
      this.timeOut = setInterval(() => {
        this.getRb()
        this.ms++
        this.getdata()
      }, 1000);
    },
    // 开始
    star() {
      this.getAES()
      this.getMd5()
      this.getajax()
      this.getPush()
    },
    star1() {
      this.getAES()
      this.getdata()
      this.getajax()
      setTimeout(() => {
        this.getRb()
      }, 500);
    },
    // 停止
    stop() {
      clearInterval(this.timeOut)
    }
  }
}
</script>

<style scoped>

</style>

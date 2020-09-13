<template>
  <div>
    <el-dialog class="dia"
               :visible.sync="dialogVisible">
      <header><span id="title">与{{name}}的对话</span></header>
      <main>
        <div ref="dialog"
             id="dialog">
          <div v-for="item in message"
               :key="item.id">
            <div class="myMessage"
                 v-if="item.sender===myId">
              <span class="time">{{getTime(item.created_at)}}</span>
              <div class="bubble">{{item.text}}</div>
            </div>

            <div class="oppMessage"
                 v-if="item.sender===opposite">
              <span class="time">{{getTime(item.created_at)}}</span>
              <div class="bubble">{{item.text}}</div>
            </div>
          </div>
        </div>
        <div id="editor">
          <el-input type="textarea"
                    v-model="input"></el-input>
        </div>
      </main>
      <footer>
        <el-button type="primary"
                   id="submit"
                   @click="sendMessage">发送</el-button>
      </footer>
    </el-dialog>
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  display: none;
}
.myMessage {
  margin-left: 50%;
  /* text-align: right; */
  right: 0;
  width: 100%;
  position: relative;
}
#dialog {
  width: 100%;
  height: 350px;
  overflow: scroll;
  position: relative;
}
.bubble {
  width: 40%;
  margin: 5px 0px 15px 15px;
  padding: 10px;
  background-color: rgb(218, 211, 211);
  position: relative;
}
.time {
  color: #909399;
  font-size: 10px;
}
#title {
  font-size: 20px;
}
#submit {
  margin-left: 90%;
  margin-right: 5%;
  position: relative;
  right: 0;
}
</style>
<script>
import Axios from 'axios'
export default {
  props: {
    name: String,
    myId: Number,
    opposite: Number,
    dialogVisible: Boolean
  },
  data: function () {
    return {
      message: [],
      input: '',
      timeId: () => { return 0 },
      lastMessageSize: 0
    }
  },
  created: function () {
    this.timeId = window.setInterval(() => {
      setTimeout(() => {
        if (this.dialogVisible === true) {
          // eslint-disable-next-line @typescript-eslint/camelcase
          Axios.get('/api/v1/message/chats/', { params: { id_one: this.myId, id_two: this.opposite }, headers: { Authorization: this.$store.getters.getUserKey } })
            .then((Response) => {
              this.message = Response.data
              if (this.lastMessageSize !== this.message.length) {
                this.lastMessageSize = this.message.length
                this.scrollToBottom()
              }
            })
            .catch((error) => {
              console.log(error.Response)
              this.$alert(error.response.data)
              // alert(error.Response)
            })
        }
      }, 0)
    }, 1000)
  },
  destroyed: function () {
    clearInterval(this.timeId)
  },
  methods: {
    sendMessage: function () {
      if (this.input === '') {
        this.$message('消息不能为空')
        return
      }
      Axios.post('/api/v1/message/', { sender: this.myId, receiver: this.opposite, text: this.input }, { headers: { Authorization: 'Token ' + this.$store.getters.getUserKey } })
        .then((Response) => {
          this.message.push(Response.data)
          this.input = ''
          this.scrollToBottom()
        })
        .catch((error) => {
          // this.$message('发送失败')
          this.$alert(error.response.data)
          console.log(error.Response)
          console.log(error)
        })
    },
    scrollToBottom: function () {
      setTimeout(() => {
        const div = this.$refs.dialog
        div.scrollTop = div.scrollHeight
      })
    },
    getTime: function (time) {
      let t = ''
      t += time.split('T')[0] + ' ' + time.split('T')[1].split('.')[0]
      return t
    }
  }
}
</script>

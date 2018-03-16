<template>
<div class="container">
  <audio id="mediaDom" ref="musicDom" loop autoplay="autoplay">
    <source :src="bgm" type="audio/mpeg">
  </audio>
  <img src="../assets/musiclogo.png" @click="ctlMusic" class=" musiclogo" :class="musicPlaying ? 'rotate' : ''">
  <img src="../assets/title.png" class="img">
  <div class="progress">
    <span v-if="!showResult">
      {{ questionIndex + 1 }} / {{ questions.length }}
    </span>
    <span v-else>结果</span>
  </div>
  <template v-if="!showResult" v-for="(q, index) in questions">
    <div class="question" v-show="index === questionIndex">
      <img v-if="q.hasImage" src="../assets/shualian.jpg" class="img-shualian">
      <p class="desc">
        {{ q.value }}
      </p>
      <div class="options" v-for="(option, _index) in q.options">
        <div class="flex-item" @click="checked(_index)">
          <img class="option" v-if="option.isChecked" src="../assets/ischecked.png">
          <img class="option" v-else src="../assets/nochecked.png">
          <span>{{ option.desc }}</span>
        </div>
      </div>
    </div>
  </template>

  <div class="result" v-if="showResult">
    <!-- {{ resultMessage }} -->

    <div class="result-p cuoti">
      <p>恭喜你答对你<span style="color: green"> {{ resultMessage.countCorrect }} </span>题,
      获得了 {{ resultMessage.fenshu }} 分！（总分150）
      </p>

      <p class="result-p">
        获得 <span style="color: red; font-size:20px;">“{{ resultMessage.chenghao }}达人”</span> 的称号！
      </p>

      <!-- <p v-if="resultMessage.cuoti.length > 0">错了第
        <span style="color: red">
          <template v-for="(tihao, index) in resultMessage.cuoti">
            {{ tihao }}
            <span v-if="index !== resultMessage.cuoti.length - 1">,</span>
          </template>
        </span>题，
      </p> -->
    </div>

    <p class="result-p quote">
      <i>
      {{ resultMessage.yinyong }}
      </i>
    </p>
    <p style="text-align: center; font-size: 14px;">
      想知道<span v-if="resultMessage.cuoti.length > 0">正确答案以及</span>更多美妆资讯？
    </p>
    <p class="result-p" style="font-size: 14px;">
      快来关注我们的公众号吧！
    </p>
  </div>

  <div v-if="!showResult && questionIndex !== 0" class="pre" @click="pre">
    返回上一题

  </div>

  <span class="copyright">版权所有 公众号xxx</span>

</div>
</template>

<script>
import questions from '../data/questions.js'
import bgm from '../assets/bgm1.mp3'
export default {
	name: 'q1',
	components: {

	},
	data () {
		return {
      questions,
      questionIndex: 0,
      showResult: false,
      // showResult: true,
      resultMessage: {
        chenghao: '',
        fenshu: '',
        yinyong: '',
        cuoti: [],
        countCorrect: 0,
      },
      bgm,
      musicPlaying: true
		}
	},

  // mounted () {
  //   let musicDom = this.$refs.musicDom

  //   if (musicDom.paused) {
  //     console.log('music paused at begainng');
  //     musicDom.play()
  //   }
  //    this.musicPlaying = musicDom.paused ? false : true
  // },

  methods: {
    getTotalScore () {
      let totalScore = 0
      let cuoti = []
      this.questions.forEach((q, index) => {
        if (q.selectedIndex === q.correctIndex) {
          totalScore += 10
        } else {
          console.log(index);
          cuoti.push(index + 1)
        }
      })
      return {
        totalScore,
        cuoti
      }
    },
    getResultMsg () {
      let { totalScore, cuoti } = this.getTotalScore()

      this.resultMessage.cuoti = cuoti
      this.resultMessage.fenshu = totalScore
      this.resultMessage.countCorrect = totalScore / 10

      let chenghao, yinyong
      if (totalScore <= 50) {
        chenghao = '美妆爱问潜力股'
        yinyong = '人生若只如初见 还在美妆起跑线'
      } else if (totalScore <= 100) {
        chenghao = '美丽研习小行家'
        yinyong = '人间自有真情在 勤学苦练进步快'
      } else {
        chenghao = '美妆武林扛把子'
        yinyong = '衣带渐宽终不悔 护肤美妆我都会'
      }
      this.resultMessage.chenghao = chenghao
      this.resultMessage.yinyong = yinyong
      this.showResult = true
    },
    checked (index) {
      // 初始化打钩
      let currentQuestion = this.questions[this.questionIndex]
      currentQuestion.options.forEach((option) => {
        option.isChecked = false
      })

      currentQuestion.options[index].isChecked = true
      currentQuestion.selectedIndex = index

      console.log(this.questions[this.questionIndex].selectedIndex === this.questions[this.questionIndex].correctIndex);

      setTimeout(() => {
        this.questionIndex = this.questionIndex + 1
      },300)


       if (this.questionIndex === this.questions.length - 1) {
        console.log('end');
        this.getResultMsg()
      }

    },
    pre () {
      if (this.questionIndex === 0 || this.showResult === true) return
      this.questionIndex = this.questionIndex - 1
    },
    ctlMusic () {
      let musicDom = this.$refs.musicDom

      if (!musicDom.paused) {
        musicDom.pause()
        this.musicPlaying = false
      } else {
        musicDom.play()
        this.musicPlaying = true
      }
    }
  }
}
</script>

<style scoped>
  .container {
    /*height: 100%;*/
    position: relative;
    display: flex;
    flex-direction: column;
    /*justify-content: center;*/
    align-items: center;
    padding-bottom: 10px;
  }
  .img {
    margin-top: 30px;
    width: 150px;
    z-index: 5;
    visibility: visible;
    animation-duration: 0.5s;
    animation-delay: 0s;
  }
  .progress {
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-top: 20px;
    z-index: 5;
    background-color: #ffaf00;
    border-radius: 50%;
    text-align: center;
  }
  .pre {
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: #ffaf00;
    border-radius: 10px;
    width: 200px;
    padding: 5px 0;
    text-align: center;
  }
  .question {
    margin-top: 30px;
    width: 100%;
    text-align: center;
  }
  .desc {
    margin-bottom: 50px;
    text-align: left;
    padding-left: 50px;
  }
  .options {
    padding-left: 50px;
  }
  .option {
    width: 26px;
    z-index: 3;
    display: inline-block;
    margin-right: 5px;
  }
  .flex-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  .result {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 80%;
  }
  .qrcode {
    width: 90%;
    display: block;
    margin: 0 auto;
  }
  .result-p {
    margin-bottom: 30px;
    text-align: center;
  }
  .quote {
    margin-top: 30px;
  }
  .cuoti {
    /*text-align: center;*/
  }
  .img-shualian {
    width: 250px;
    margin-bottom: 20px;
  }
  .rotate {
    animation: rotating 1.2s linear infinite;
  }
  @keyframes rotating {
    from { transform: rotate(0); }
    to { transform: rotate(360deg);  }
  }
  .musiclogo {
    position: absolute;
    right: 10px;
    width: 35px;
    height: 35px;
  }
  .copyright {
    /*position: absolute;
    bottom: 10px;*/
    margin-top: 20px;
    font-size: 10px;
  }
</style>
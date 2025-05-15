import { expInfo } from "../settings";
let { TIMING, CODES } = expInfo;

// Text on the screens
export const SCREEN_INFO = {
  welcome: {
    en: `<div class='main'>
    <h1 class='title'>Welcome!</h1>
    <p class='fb-text'>
      Thank you very much for participating in this experiment.
    </p>
    </div>`,
    de: `<div class='main'>
    <h1 class='title'>Willkommen!</h1>
    <p class='fb-text'>
      Vielen Dank für Ihre Teilnahme an diesem Experiment.
    </p>
    </div>`,
    cn: `<div class='main'>
    <h1 class='title'>欢迎您参与本实验!</h1>
    </div>`,
  },


  startTrial: {
    en: ` <p>The next trial will start in <span id="clock" style="color:red">10</span> seconds.</p>
    <p>Press the space bar to start directly.</p>`,
    de: ` <p>Der nächste Durchgang beginnt in <span id="clock" style="color:red">10</span> Sekunden.</p>
    <p>Drücken Sie die Leertaste, um direkt zu beginnen.</p>`,
    cn: ` <p>下一个试次将在 <span id="clock" style="color:red">10</span> 秒后开始。</p>
    <p>按下空格键后将直接开始</p>`,
  },

  blockBreak: function (blockID: number, nBlock: number, lang: string) {
    switch (lang) {
      case "cn":
        return `<div class='main'>
          <h1 class='title'>休息一下吧</h1>
          <p class='fb-text'>
            你已经完成了 ${blockID}/${nBlock} 的实验,
            实验将在 <span id='break' style='color:red'>${expInfo.TIMING.BREAK}</span> 秒后继续。
          </p>
          <p class="fb-text">你可以按下空格键直接开始</p>
          <br>

        </div>`;
      case "en":
        return `<div class='main'>
          <h1 class='title'>Take a break</h1>
          <p class='fb-text'>
            You have completed ${blockID}/${nBlock} blocks. 
            The next block will start in <span id='break' style='color:red'>${expInfo.TIMING.BREAK}</span> seconds.
          </p>
          <p class="fb-text">Press the space bar to skip the break</p>
          <br>
        </div>`;
    }
  },

  fullScreen: {
    en: "The experiment will switch to full screen",
    de: "Das Experiment wechselt in den Vollbildmodus",
    cn: "即将进入全屏模式",
  },

  feedback: function (accuracy: number, nTest: number, lang: string) {
    switch (lang) {
      case "en":
        return `<div class='fb-text'>You correctly recalled ${accuracy} out of ${nTest} letters.</div>`;
      case "de":
        return `<div class='fb-text'>Sie haben ${accuracy} von ${nTest} Buchstaben korrekt erinnert.</div>`;
      case "cn":
        return `<div class='fb-text'>您正确回忆了${accuracy}/${nTest}个字符。</div>`;
    }
  },
};

// Button information
export const BUTTON_INFO = {
  continueButton: {
    en: ["Continue"],
    de: ["Weiter"],
    cn: ["继续"],
  },

  prevButton: {
    en: ["Previous"],
    de: ["Zurück"],
    cn: ["上一页"],
  },

  nextButton: {
    en: ["Next"],
    de: ["Weiter"],
    cn: ["下一页"],
  },

  submitButton: {
    en: "Submit",
    de: "Bestätigen",
    cn: "提交",
  },
};

// The information for different situations at the end of the experiment
export const END_INFO = {
  failedResize: {
    en: `<div class="main">
    <h1 class="title">Experiment discontinued</h1>
    <p>
        Unfortunately, your window size is too small to continue the experiment.
        we therefore have to end this experiment and we cannot grant you any course credit.
        If you have any questions, please contact the researcher.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验中止</h1>
    <p>
        很抱歉，您的窗口尺寸过小，无法继续实验。
        我们不得不结束此实验，无法为您提供任何课程学分。
        如果您有任何问题，请联系研究人员。
    </p>
    </div>`,
  },

  failed: {
    en: `<div class="main">
    <h1 class="title">Failed Attention Check </h1>
    <p>
        Unfortunately, you have left the tab or browser window more often than allowed.
        As we told you at the beginning of the experiment,
        we therefore have to end this experiment prematurely and we cannot grant you any course credit.
        If you have any questions, please contact the researcher.
    </p>
    </div>`,
    de: `<div class="main">
    <h1 class="title">Fehlgeschlagener Aufmerksamkeitstest</h1>
    <p>
        Leider haben Sie das Browser-Tab oder das Browserfenster öfter verlassen als erlaubt.
        Wie wir Ihnen zu Beginn des Experiments mitgeteilt haben,
        müssen wir das Experiment daher vorzeitig beenden und können Ihnen keine Versuchspersonenstunden gutschreiben.
        Wenn Sie Fragen haben, wenden Sie sich bitte an die Studienleitung.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验中止</h1>
    <p>
        很抱歉，由于您离开标签或浏览器窗口的次数超过了最大值，实验被迫中止。
        您将无法获得实验时长或被试费。如果您有任何问题，请联系主试。
    </p>
    </div>`,
  },

  completedOnline: {
    en: `<div class="main">
    <h1 class="title">Congratulations!</h1>
    <p>
        You have successfully completed the experiment! 
        We are now transferring data to the server. 
        Please copy the following completion code: ${CODES.OFFLINE}. 
        If the window is not redirected to Prolific after 5 minutes, 
        you can just close it and submit the completion code to Prolific.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验结束</h1>
    <p>
        恭喜你顺利完成实验！我们正在将数据上传至服务器。
        请复制以下完成代码：${CODES.OFFLINE}。
        如果窗口在5分钟内未重定向到Prolific，请直接关闭窗口并将完成代码提交至Prolific。
    </p>
    </div>`,
  },

  completedOffline: {
    en: `<div class="main">
          <p h1 class="title">Congratulation!(Offline Mode)</h1>
          <p class="body-center">
          You have successfully completed the experiment while in offline mode.
          Your data failed to transfer to the server due to network issues.
          It has been automatically downloaded to your "Downloads" folder.
          Please contact the researcher for further assistance.
          </p>
          </div>`,
    cn: `<div class="main">
          <p h1 class="title">恭喜你！（离线模式）</h1>
          <p class="body-center">
          您已成功完成了实验，但是由于网络问题，您的数据未能上传至服务器。
          数据已自动下载至您的“下载”文件夹，请联系研究人员以获取进一步的帮助。
          </p>
          </div>`,
  },
};

export const SURVEY_INFO = {
  TITLE_INFO: {
    cn: `<h1 class="title">事后问卷</h1>`,
    en: `<h1 class="title">Post-Experiment Questionnaire</h1>`,
  },
  DESCRIPTION: {
    cn: `<div class="main">本问卷的内容仅用于实验数据的处理，对您是否能够获取实验报酬没有影响。请您如实填写。</div>`,
    en: `<div class="main">
    This questionnaire is only used for the processing of experimental data 
    and has no effect on whether you can receive the credit. 
    Please fill in truthfully.</div>`,
  },

  AGE_QUES: {
    en: "How old are you?",
    de: "Wie alt sind Sie",
    cn: "您的年龄是？",
  },

  SEX_QUES: {
    en: "What is your sex?",
    de: "Was ist Ihr Geschlecht?",
    cn: "您的性别是？",
  },

  SEX_OPT: {
    en: ["Male", "Female", "Other"],
    de: ["Männlich", "Weiblich", "Andere"],
    cn: ["男", "女", "其他"],
  },

  ATTENTION_QUES: {
    cn: "在实验过程中，您是否受到了外界环境的干扰？",
    en: "Were you distracted during the experiment?",
  },
  ATTENTION_OPT: {
    cn: ["是", "否"],
    en: ["Yes", "No"],
  },
  COMMENT_QUES: {
    cn: "您对本次实验是否有任何建议或意见？",
    en: "Do you have any suggestions or comments on this experiment?",
  },
};

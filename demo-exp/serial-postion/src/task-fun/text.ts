import { expInfo } from "../settings";

export const TEXT = {
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

  feedback: function (accuracy: number, nTest: number, lang: string) {
    switch (lang) {
      case "en":
        return `<div class='fb-text'>You correctly recalled ${accuracy} out of ${nTest} letters.</div>`;
      case "de":
        return `<div class='fb-text'>Sie haben ${accuracy} von ${nTest} Buchstaben korrekt erinnert.</div>`;
      case "cn":
        return `<div class='fb-text'>您正确回忆了${accuracy}/${nTest}个字母。</div>`;
    }
  },

  startPractice: {
    en: `<div class='main'>
        <h1 class='title'>Practice</h1>
        <p class='fb-text'>We will do some practice to get familiar with the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Übung</h1>
        <p class='fb-text'>Wir werden nun einige Übungen machen, damit Sie mit dem Experiment vertraut werden.</p>
      </div>`,
    cn: `<div class='main'>
        <h1 class='title'>练习环节</h1>
        <p class='fb-text'>接下来我们将进行一些练习以熟悉实验流程。</p>
      </div>`,
  },

  startExperiment: {
    en: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Good job! Now we will start running the experiment.</p>
      </div>`,
    de: `<div class='main'>
        <h1 class='title'>Experiment</h1>
        <p class='fb-text'>Gut gemacht! Jetzt beginnen wir mit dem Experiment.</p>
      </div>`,
    cn: `<div class='main'>
        <h1 class='title'>实验环节</h1>
        <p class='fb-text'>练习结束！现在我们将开始进行正式实验。</p>
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

  fullScreen: {
    en: "The experiment will switch to full screen",
    de: "Das Experiment wechselt in den Vollbildmodus",
    cn: "即将进入全屏模式",
  },

  repeatedPart: {},

  failedOnline: {
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
        很抱歉，由于您离开标签或浏览器窗口的次数超过了最大值，实验不得不提前结束。
        您将无法获得课程时长或被试费。如果您有任何问题，请联系主试。
    </p>
    </div>`,
  },

  failedOffline: {
    en: `<div class="main">
      <p class="title">Failed Attention Check</p>
      <p class="body-center">
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
        很抱歉，由于您离开标签或浏览器窗口的次数超过了最大值，实验不得不提前结束。
        您将无法获得课程时长或被试费。如果您有任何问题，请联系主试。
    </p>
    </div>`,
  },

  completedOnline: {
    en: `<div class="main">
    <h1 class="title">Congratulation!</h1>
    <p>
        You have completed the experiment successfully.
    </p>
    </div>`,
    de: `<div class="main">
    <h1 class="title">Herzlichen Glückwunsch!</h1>
    <p>
        Sie haben das Experiment erfolgreich abgeschlossen.
    </p>
    </div>`,
    cn: `<div class="main">
    <h1 class="title">实验结束</h1>
    <p>
        恭喜你顺利完成实验！主试会在24小时内根据您的个人信息与您取得联系。
    </p>
    </div>`,
  },

  completedOffline: {
    en: `<div class="main">
          <p class="body-center">Congratulation!(Offline Mode)</p>
          <p class="body-center">
          You have successfully completed the experiment while in offline mode.
          The data is automatically downloaded and can be found in your download folder.
          Please sent the data to the researcher via email.
          </p>
          </div>`,
    de: `<div class="main" lang="de">
          <p class="body-center">Herzlichen Glückwunsch!(Offline-Modus)</p>
          <p class="body-center">
          Sie haben das Experiment erfolgreich im Offline-Modus abgeschlossen.
          Die Daten werden automatisch heruntergeladen und können in Ihrem Download-Ordner gefunden werden.
          Bitte senden Sie die Daten per E-Mail an die Studienleitung.
          </p>
          </div>`,
    cn: `<div class="main">
          <p class="body-center">实验结束（离线模式）</p>
          <p class="body-center">
          恭喜你顺利完成实验！实验数据已经自动下载到您的“下载”文件夹中。请在指定网页上传数据。
          </p>
          </div>`,
  },
};
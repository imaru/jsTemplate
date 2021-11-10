//以下は使用時には削除してください
//htmlを表示するプラグイン（html-keyboard-response）を利用
const showHelloWorld = {
    type: 'html-keyboard-response',
    stimulus: 'fかjで答えてください',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1 * 1000
}

var test_stimuli = [
    '../bspng/2011M.png',
     '../bspng/2011N.png',
     '../bspng/2011P.png',
     '../bspng/2011Q.png',
     '../bspng/2011S.png',
     '../bspng/2011T.png',
     '../bspng/2013A.png',
     '../bspng/2013B.png',
     '../bspng/2013O.png',
     '../bspng/2013P.png',
     '../bspng/2013Q.png',
     '../bspng/2013R.png',
     '../bspng/2013S.png',
     '../bspng/2013T.png',
     '../bspng/2013U.png',
     '../bspng/2013V.png',
     '../bspng/2013W.png',
     '../bspng/2013W.png',
     '../bspng/2013Y.png',
     '../bspng/2013Z.png',
     '../bspng/2014B.png',
     '../bspng/2014D.png',
     '../bspng/2014F.png'
]; // 刺激となる画像ファイル

var nRepeat = 1;

// 印象評定の質問項目
var question1 = ['<p class="center-content">画像がどのくらい美しいかをお答えください。</p>'];
var question2 = ['<p class="center-content">画像がどのくらい明るいかをお答えください。</p>'];

// それぞれの質問に対してスケールに表示させる文言
var scale1 = ["全く美しくない", "かなり美しくない", "あまり美しくない", "どちらともいえない", "やや美しい", "かなり美しい", "とても美しい"];
var scale2 = ["とても暗い", "かなり暗い", "やや暗い", "やや明るい", "かなり明るい", "とても明るい"];
var datestr = new Date(); // 日時の情報
// スペースキーのあとのブランクを800ms から1200msに。
var post_trial_gap = function () {
    var minTime = 800;
    var maxTime = 1200;
    return Math.floor(Math.random() * (maxTime - minTime)) + minTime;
}

var welcome_block = {
    type: "html-keyboard-response",
    stimulus: '<p class="center-content">実験へのご協力をありがとうございます。<br>実験を始める前に、ウェブブラウザ以外のアプリケーションを終了してください。<br>実験中はブラウザの「戻る」ボタンはクリックしないでください。<br><br>準備ができたらスペースキーを押してください。</p>',
    choices: [32],
    //cont_key: [32], // スペースキー以外の入力を受け付けない。
    on_finish: function () {
        var month2 = datestr.getMonth() + 1; // getMonthの戻り値は0から始まるため。
        // 日時の情報と、実験参加者ごとにランダムな識別番号を追加。
        jsPsych.data.addProperties({
            nichiji: datestr.getFullYear() + '-' + month2 + '-' + datestr.getDate() + '-' + datestr.getHours() + ':' + datestr.getMinutes() + ':' + datestr.getSeconds(),
            randNo: Math.floor(Math.random() * 100000)
        });
    }
};


// 現在日時からタイムスタンプのファイル名を生成
const d = new Date(); // Today
const DateTimeFormat = 'YYYYMMDD_hhmiss'; // "2019/10/04 12:34:56" -> "20191004_123456"
let toFileName = DateTimeFormat
    .replace(/YYYY/g, String(d.getFullYear()))
    .replace(/MM/g, ('0' + (d.getMonth() + 1)).slice(-2))
    .replace(/DD/g, ('0' + d.getDate()).slice(-2))
    .replace(/hh/g, ('0' + d.getHours()).slice(-2))
    .replace(/mi/g, ('0' + d.getMinutes()).slice(-2))
    .replace(/ss/g, ('0' + d.getSeconds()).slice(-2));

function start() {
    var experiment = []; // 初期化
    experiment.push(welcome_block); // 実験開始時の文章（ブロック）を追加。

    for (var k = 0; k < nRepeat; k++) {
        var shuffledArray = jsPsych.randomization.shuffle(test_stimuli); // 刺激をランダムな順番で呈示するため

        for (var i = 0; i < test_stimuli.length; i++) {
            var trial = {
                type: 'survey-likert', // 使用するプラグイン
                preamble: ['<div class="jspsych-image-center"><img src="' + shuffledArray[i] + '"></img></div>'], // 呈示する画像の指定
                questions: [
                    {prompt: question1, labels: scale1},
                    {prompt: question2, labels: scale2}
                ],
                //labels: [scale1, scale2],
                //intervals: [[7, 6]], // 質問1については7件法で、質問2については6件法で回答
                data: { repeat_count: k + 1, trial_count: i + 1, stimulus2: shuffledArray[i] }, // 保存したいデータを任意で追加することができます。
                on_finish: function (data) {
                    var arrayResponses = JSON.parse(data.responses); // responsesは文字列型で集計時に扱いにくいため、データを切り分けます。
                    jsPsych.data.addDataToLastTrial(arrayResponses);
                } 
            };
            experiment.push(trial);
        }
    }

    jsPsych.init({
        //display_element: $('#jspsych-target'),
        timeline: experiment,
        on_finish: function (data) {
            //jsPsych.data.displayData('csv') // 画面上にカンマ区切りでデータを表示します。
            saveData(toFileName + '.csv', jsPsych.data.get().csv())
        }
    });
}

jsPsych.pluginAPI.preloadImages(test_stimuli, start); // あらかじめ実験で用いる画像を読み込んでおく。


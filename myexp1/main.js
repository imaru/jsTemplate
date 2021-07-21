//以下は使用時には削除してください
//htmlを表示するプラグイン（html-keyboard-response）を利用
const showHelloWorld = {
    type: 'html-keyboard-response',
    stimulus: 'fかjで答えてください',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1 * 1000
}

const showMyName = {
    type: 'html-keyboard-response',
    stimulus: '伊丸岡俊秀',
    choices: ['f','j']
}

//空のtimelineを作成
const timeline = [];

//刺激語
var text=['石川','富山','福井','長野','新潟'];

for (var i=0; i<length(text); i++){
    var stimtext = {
        type='html-keyboard-response',
        stimulus: text[i],
        choices: ['f','j']
    }
    //timeline.push(stimtext);
}

//以下は使用時には削除してください
//各試行・ブロックをtimelineに追加
timeline.push(showHelloWorld);
timeline.push(stimtext;

//以下はjsPsychの初期設定
//デフォルトでのデータ保存は終了時に画面に表示
//csvで出力したい場合は「終了時にcsvに出力」の方を利用する
jsPsych.init({
    timeline: timeline,
    on_finish: function()
    {
        //終了時にデータを画面に表示
        jsPsych.data.displayData("csv")

        //終了時にデータをcsvに出力
        //jsPsych.data.get().localSave("csv", "data.csv")
    }
});

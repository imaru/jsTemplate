//以下は使用時には削除してください
//htmlを表示するプラグイン（html-keyboard-response）を利用
const showHelloWorld = {
    type: 'html-keyboard-response',
    stimulus: 'fかjで答えてください',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1 * 1000
}
//空のtimelineを作成
const timeline = [];
const showMyName = {
    type: 'html-keyboard-response',
    stimulus: '伊丸岡俊秀',
    choices: ['f', 'j']
}
timeline.push(showHelloWorld);

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

//刺激語
var text = ['石川', '富山', '福井', '長野', '新潟'];

for (var i = 0; i < text.length; i++) {
    var stimtext = {
        type: 'html-keyboard-response',
        stimulus: text[i],
        choices: ['f', 'j']
    }
    timeline.push(stimtext);
}

//以下は使用時には削除してください
//各試行・ブロックをtimelineに追加

//timeline.push(stimtext);

//以下はjsPsychの初期設定
//デフォルトでのデータ保存は終了時に画面に表示
//csvで出力したい場合は「終了時にcsvに出力」の方を利用する
jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        console.log(toFileName)
        saveData(toFileName+'.csv', jsPsych.data.get().csv())
        //終了時にデータを画面に表示
        //jsPsych.data.displayData("csv")

        //終了時にデータをcsvに出力
        //jsPsych.data.get().localSave("csv", "data.csv")
    }
});


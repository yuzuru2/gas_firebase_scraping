function main() {
  const _firebase_url =
    'https://asia-northeast1-プロジェクトのid.cloudfunctions.net/api/yahoo';

  const _firebase_response = UrlFetchApp.fetch(_firebase_url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    payload: JSON.stringify({
      source: UrlFetchApp.fetch('https://www.yahoo.co.jp/').getContentText(
        'UTF-8'
      ),
    }),
  });

  // スプレッドシート作成
  (function () {
    const _now = new Date();

    SpreadsheetApp.setActiveSpreadsheet(
      SpreadsheetApp.openById(
        SpreadsheetApp.create(
          '' +
            _now.getFullYear() +
            '-' +
            (_now.getMonth() + 1) +
            '-' +
            _now.getDate() +
            '-' +
            _now.getHours() +
            '-' +
            _now.getMinutes() +
            '-' +
            _now.getSeconds()
        ).getId()
      )
    );
  })();

  const list = JSON.parse(_firebase_response.getContentText());
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

  for (var i = 0; i < list.length; i++) {
    sheet.getRange(i + 1, 1).setValue(list[i]['title']);
    sheet.getRange(i + 1, 2).setValue(list[i]['url']);
  }
}

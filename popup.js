var API_BASE = 'https://www.googleapis.com/drive/v2';

document.addEventListener('DOMContentLoaded', main);

function main() {
  document.getElementById('key-file-search').addEventListener('click', searchForKeyFile);
}

function searchForKeyFile() {
  var query = document.getElementById('key-file-name').value;
  var encodedQuery = encodeURIComponent(query).replace("'", "\\'")
  sendXhr('GET', API_BASE + '/files?q=title+=+\'' + encodedQuery + '\'', displayFiles);
}

function sendXhr(method, url, callback) {
  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onload = callback;
    xhr.send();
  });
}

function displayFiles() {
  var files = JSON.parse(this.responseText);
  var ul = document.getElementById('files');
  for (var i = 0; i < files.items.length; i++) {
    var li = document.createElement('li');
    li.textContent = files.items[i].title;
    ul.appendChild(li);
  }
}
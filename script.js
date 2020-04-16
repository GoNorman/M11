let text = document.querySelector('.textEdit');


text.addEventListener('keyup', function(){
    let request = new XMLHttpRequest();
    let API_KEY = 'trnsl.1.1.20200412T222442Z.01b77dc060d151af.f59c51605a39bde952db9a4b6d13970f61e9d240';
    let url = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
    let select = document.querySelector('.source').value;
    let select2 = document.querySelector('.finite').value;
    url = url + '?key=' + API_KEY;        
    url += '&text=' + text.textContent;
    url += '&lang=' + select + '-' + select2;
    request.onload = function () {
        let translate = document.querySelector('.result');
        let response = JSON.parse(request.response);
        if(text.textContent == "") {
            translate.innerHTML = '';
        } else {
        if (response.code !== 200) {
            translate.innerHTML = 'Произошла ошибка при получении ответа от сервера:\n\n' + response.message + ' ' + request.statusText;
        return;
        }
        if (response.text.length === 0) {
            translate.innerHTML = 'К сожалению, перевод для данного слова не найден';
            return;
        }
        translate.innerHTML = response.text.join('<br>');
        }
    }
    request.onerror = function(){
       if(request.status == 0) {
           alert('Ошибка с сетью, статус: ' + request.status)
       } 
   }
    request.open('GET', url);
    request.send();
});
async function GetValidationEmail() {

    if (document.getElementById('send_authCode_btn')) {
        document.getElementById('send_authCode_btn').remove();
    }
    let email = await GetEmail();
    document.getElementById('confirm_email').innerHTML = email;
    let defaultUrl = Object.values(defaultHost())[0];
    fetch(defaultUrl+'/send_confirm_email', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await GetCookieValue('gardenToken'),
        },
    })
        .then(async function (response) {
            let value = await response.json();
            if (value.token === false) {
                await ConnectionSignalR();
            }
            await ConnectionSignalR(value.data);
        })
}

function ConfirmAuthCode() {

    let email = document.getElementById('confirm_email').textContent;
    let authCode = document.getElementById('client_confirm_code').value;
    let defaultUrl = Object.values(defaultHost())[0];
    let connection = new signalR.HubConnectionBuilder().withUrl(defaultUrl+"/realtimeCheckHub").build();

    connection.start().then(async function () {
        connection.invoke("ConfirmAuthCode", email, authCode).then(async function (data) {
            if (data === true) {
                await UpdateUserInfo();
            }
        })
            .catch(function (err) {
                console.log("에러터짐 ㅠㅠ");
                return console.error(err.toString());
            });
    });
}

//유저 정보 업데이트
async function UpdateUserInfo() {
    let defaultUrl = Object.values(defaultHost())[0];
    fetch(defaultUrl +'/comfirmation', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await GetCookieValue('gardenToken'),
        }
    })
        .then(async function (reponse) {
            let value = await reponse.json();
            if (value.token == true) {
                window.location.href = '/GardenUser/Index';
            }
        });
}

//SignalR 연결
function ConnectionSignalR(data) {
    let defaultUrl = Object.values(defaultHost())[0];
    let connection = new signalR.HubConnectionBuilder().withUrl(defaultUrl+"/realtimeCheckHub").build();
    connection.start().then(async function () {
        await EnrollmentConfirmEmail(connection, data);
    }).catch(function (err) {
        return console.error(err.toString());
    });
}

//확인용 메일, 코드 저장
function EnrollmentConfirmEmail(connection, data) {
    connection.invoke("EnrollmentConfirmEmail", data.email, data.authCode).then(function (data) {
        if (data === true) {
            TimerStart();
        }
    })
        .catch(function (err) {
            return console.error(err.toString());
        });
}

//타이머 시작
function TimerStart() {
    let time = 120;
    let min = '';
    let sec = '';
    let timer = setInterval(function () {
        min = parseInt(time / 60);
        sec = time % 60;

        document.getElementById("timer_text").innerHTML = min + "분 " + sec + "초";
        time--;

        if (time < 0) {
            clearInterval(timer);
            document.getElementById("timer_text").innerHTML = "시간이 초과 되었어요.";
            ResetEmailConfirm();
        }
    }, 1000);
}

//이메일 리셋
function ResetEmailConfirm() {
    let email = document.getElementById('confirm_email').textContent;
    let defaultUrl = Object.values(defaultHost())[0];

    let connection = new signalR.HubConnectionBuilder().withUrl(defaultUrl+"/realtimeCheckHub").build();
    connection.start().then(function () {
        connection.invoke("ResetEmailconfirm", email).then(function (data) {
            if (data === true) {
                console.log("이메일 리셋")
                GenerateSendEmailBtn();
            }
        });
    }).catch(function (err) {
        return console.error(err.toString());
    });

}

//인증코드 다시 보내기
function GenerateSendEmailBtn() {
    let btn = '<button class="btn btn-warning btn-sm" id="send_authCode_btn" type="button" onclick="GetValidationEmail()">다시 보내기</button>';
    document.getElementById('timer_reset').innerHTML = btn;
}
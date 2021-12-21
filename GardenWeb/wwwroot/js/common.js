//일반적으로 모달창 열기
function openModal(controllerName, actionName, id) {
    console.log('test');
    let url = '';
    if (id == "" || id == 0) {
        url = '/' + controllerName + '/' + actionName;
    } else {
        url = '/' + controllerName + '/' + actionName + '?id=' + id;
    }
    click_common_btn(url);
}

//function setCookieExpire(min) {
//    let now = new Date();
//    now.setTime(now.getTime() + (min * 60 * 1000));
//    return now.toGMTString();
//}

function SetCookie(cookieName, cookieValue) {
    //let cookieValue = document.getElementById('garden_token').value;
    let cookieText = escape(cookieName) + '=' + escape(cookieValue);
    //cookieText += (cookieExpire ? '; EXPIRES=' + setCookieExpire(1) : '');
    //cookieText += (cookiePath ? '; PATH' : '');
    //cookieText += (cookieDomain ? '; DOMAIN': '');
    //cookieText += (cookieSecure ? '; SECURE' : '');
    document.cookie = cookieText;
}

//쿠키 삭제
function DeleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

async function GetCookieValue(cookieName) {
    var match = document.cookie.match(new RegExp('(^| )' + cookieName + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    else {
        return '';
    }
}

//쿠키값을 이용하여 이메일 주소 가져오기
async function GetEmail() {
    let defaultUrl = Object.values(defaultHost())[0];
    let email = '';
    let data = await fetch(defaultUrl + '/email', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': await GetCookieValue('gardenToken'),
        }
    })
        .then((response) => response.json())
        .then(data => {
            return data;
        });

    return data.email;
}

//페이지 이동
async function MovePage(url) {
    //if (await CheckAccessPermission() == true) {
    //    //location.href = url;
    //}
    location.href = url;
}

//데이터 테이블에서 모달창 열기
function datatable_openModal(obj) {
    click_common_btn(obj.value);
}

//데이터 테이블에서 모달창 열기 - param - string 추후 변경 예정
function datatable_openModal_p_string(obj) {
    let value = obj.getAttribute('data-value'); 
    let href = obj.getAttribute('data-url');

    href = href + "?id=" + value;
    click_common_btn(href);
}

//페이지 리로드
function reloadPage() {
    location.reload();
}

//에러 메세지 출력
function errorMessage() {
    Swal.fire({
        title: '문제가 발생하였습니다!',
        text: '잠시후에 다시 시도해주세요!',
        icon: 'error',
        confirmButtonText: '확인'
    });
}

function AlertMessage(message) {
    Swal.fire({
        title: message,
        icon: 'warning',
        confirmButtonText : '확인'
    })
}

//권한 체크
async function CheckAccessPermission() {
    let defaultUrl = Object.values(defaultHost())[0];

    fetch(defaultUrl + '/guserpermission', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': await GetCookieValue('gardenToken')
        }
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            console.log(jsonValue.token);
            return jsonValue.token;
        });
}

function SelectingIdOpenModal(controllerName, actionName) {
    let gardenSpace_option = document.getElementById('Garden_list');
    gardenSpace_option = gardenSpace_option.options[gardenSpace_option.selectedIndex].value;
    openModal(controllerName, actionName, gardenSpace_option);
}

//숫자만 입력
function onlyNumber() {
    if ((event.keyCode < 48) || (event.keyCode > 57))
        event.returnValue = false;
}

//url 클릭
function click_common_btn(url) {
    console.log(url);
    document.getElementById('common_modal_btn').setAttribute('data-url', url);
    document.getElementById('common_modal_btn').click();
}

//버튼에 html 기입
function ButtonInnerHTML(buttonId, html) {
    document.getElementById(buttonId).innerHTML = html;
}

//버튼 비활성화
function ButtonApplyDisabled(buttonId) {
    document.getElementById(buttonId).disabled = true;
}

//버튼 활성화
function ButtonReleaseDisabled(buttonId) {
    document.getElementById(buttonId).disabled = false;
}

//요소 지우기
function RemoveElement(elementId) {
    document.getElementById(elementId).remove();
}

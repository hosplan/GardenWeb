//정규식 검사
function PwValidation() {
    let password = document.getElementById('register_password').value;
    let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return reg.test(password);
}

//비밀번호 정규식 검사
function CheckPwValidation() {
    let divId = 'password_validation_warning_dv';
    PwValidation() ? RemoveElement(divId) : ExpressionInnerHTML('password_validation_dv',
                                                                 divId,
                                                                '* 비밀번호는 8자 이상, 숫자/대문자/소문자/특수문자 모두 포함하고 있어야 되요.');
    return false;
}

//비밀번호 , 비밀번호 확인 값 비교
function PwCompare() {
    let password = document.getElementById('register_password').value;
    let passwordCheck = document.getElementById('register_password_check').value;
    return password === passwordCheck ? true : false;
}

//비밀번호 체크
function CheckPwCompare() {  
    let divId = 'password_check_warning_dv';
    PwCompare() ? RemoveElement(divId) : ExpressionInnerHTML('password_check_dv', divId, '* 비밀번호가 일치하지 않아요');
    return false;
}

//id 값에 innertHTML 
function ExpressionInnerHTML(id, divId, message) {
    document.getElementById(id).innerHTML = MakeAlertDiv(divId, message);
    return false;
}

//표시 div 생성
function MakeAlertDiv(divId, message) {
    let alertDv = '<div class="w-100 text-center p-2" id='+divId+'>';
    alertDv += '<small class="text-danger">' + message +'</small>';
    alertDv += '</div>';

    return alertDv;
}

//이메일 체크하기
async function CheckEmail() {
    let emailElement = document.getElementById('register_email');
    let email = { email: emailElement.value }
    let divId = 'email_check_warning_dv';
    let message = '* 이메일을 작성 해주세요';

   
    if (email['email'] == '') {
        ExpressionInnerHTML('email_check_dv', divId, message);
        return false;
    }

    let defaultUrl = Object.values(defaultHost())[0];
    fetch(defaultUrl+'/checkemail', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        body: GetRegisterForm()
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token == true) {
                ButtonInnerHTML('email_check_btn', '<i class="fas fa-check mr-2"></i><span>' + jsonValue.message+'</span>');
                ButtonApplyDisabled('email_check_btn');
                emailElement.dataset.check = 'true';
                RemoveElement('email_check_dv');
            }
            else {
                AlertMessage(jsonValue.message);
            }
        });
}
//회원 등록하기
function RegisterUser() {
    fetch(Object.values(defaultHost())[0] + '/membership', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        body: GetRegisterForm()
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            console.log(jsonValue);
            if (jsonValue.token == true) {
                SetCookie('gardenToken', jsonValue.jwt);
                MovePage('/MemberShip/IndexForConfirm');
            }
            else {
                AlertMessage('오류가 발생했네요.. 잠시후 다시 시도 해 주세요!');
            }
        });
}

//form 데이터 가져오기
function GetRegisterForm() {
    let guserForm = new FormData();
    guserForm.append('Name', document.getElementById('register_name').value);
    guserForm.append('NickName', document.getElementById('register_nick_name').value);
    guserForm.append('Email', document.getElementById('register_email').value);
    guserForm.append('Password', document.getElementById('register_password').value);

    return guserForm;
}

//멤버십 양식 유효성 검사
function CheckMembershipForm() {
    let name = document.getElementById('register_name').value;
    let nickName = document.getElementById('register_nick_name').value;
    let emailElement = document.getElementById('register_email');

    if (name == null || name == '') {
        AlertMessage("이름을 작성해 주세요!");
    }
    else if (nickName == null || nickName == '') {
        AlertMessage("닉네임을 작성해 주세요!");
    }
    else if (emailElement.dataset.check == 'false') {
        AlertMessage("이메일 중복확인을 해주세요!");
    }
    else if (PwValidation() == false) {
        AlertMessage("비밀번호를 확인해 주세요!");
    }
    else if (PwCompare() == false) {
        AlertMessage("비밀번호 확인란을 확인해 주세요!")
    }
    else {
        RegisterUser();
    }   
}


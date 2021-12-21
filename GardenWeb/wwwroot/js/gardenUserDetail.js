function CloseText(textId) {
    let editText = document.getElementById(textId);
    editText.readOnly = true;
    let btnDv = document.getElementById('col-' + textId);

    while (btnDv.firstChild) {
        btnDv.removeChild(btnDv.firstChild);
    }

    //수정버튼
    let editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="bi-pencil"></i>';
    editBtn.className = 'btn btn-success btn-md';
    editBtn.setAttribute('onclick', 'EditTextOpen(\'' + textId + '\')');
    editBtn.setAttribute('type', 'button');
    editBtn.setAttribute('id', 'edit-btn-' + textId);
    btnDv.appendChild(editBtn);
}

async function EditTextOpen(textId) {
    let editText = document.getElementById(textId);

    //readonly 해제 및 포커스
    editText.readOnly = false;
    editText.focus();

    let thisCol = document.getElementById('col-' + textId);
    let removeNode = document.getElementById('edit-btn-' + textId + '');
    thisCol.removeChild(removeNode);

    //확인 버튼
    let insertBtn = document.createElement('button');
    insertBtn.innerHTML = '<i class="bi-check-lg"></i>';
    insertBtn.className = 'btn btn-info btn-md';
    insertBtn.setAttribute('onclick', 'UpdateInfo(\'' + textId + '\')');
    insertBtn.setAttribute('type', 'button');
    insertBtn.setAttribute('id', 'insert-btn-' + textId);
    thisCol.appendChild(insertBtn);

    //취소 버튼
    let backBtn = document.createElement('button');
    backBtn.innerHTML = '<i class="bi-x-lg"></i>';
    backBtn.className = 'btn btn-light btn-md ms-2';
    backBtn.setAttribute('onclick', 'CloseText(\'' + textId + '\')');
    backBtn.setAttribute('type', 'button');
    backBtn.setAttribute('id', 'insert-btn-' + textId);
    thisCol.appendChild(backBtn);

}

//버튼 생성
function CreateBtnWithIcon(icon, btnName, type, size, btnId) {
    //0 : 생성 //1 : 수정 //2 : 삭제 //3 : 입력 //4 : 삭제 //확인
    let btnType = {
        0: 'btn btn-primary',
        1: 'btn btn-success',
        2: 'btn btn-danger',
        3: 'btn btn-light',
        4: 'btn btn-warning',
        5: 'btn btn-info'
    }

    //0: 매우작음 //1: 작음 //2 : 중간 //3 : 큼
    let btnSize = {
        0: 'btn-xs',
        1: 'btn-sm',
        2: 'btn-md',
        3: 'btn-lg'
    }

    let btn = '<button type="button" class=' + btnType[type] + btnSize[type] + ' id=' + btnId + '>';
    btn += '<i class=' + icon + '></i>';
    if (btnName != '' || btn != null) {
        btn += btnName;
    }
    btn += '</button>';
    return btn;
}

function RenderUserInfo(value) {
    let img = '<img src=' + value['gUserFilePath'] + ' class="card-img-top" style="height:300px; width:100%;" />';
    document.getElementById('login_user_img').innerHTML = img;
    delete value['gUserFilePath'];

    let guserObject = {
        'gUserBirthDay': '생년월일',
        'gUserEmail': '이메일',
        'gUserName': '이름',
        'gUserNickName': '닉네임',
        'gUserUseSePassword': '2차 비밀번호 사용'
    };

    let guserInput = {
        'gUserBirthDay': '<input type="date" readonly class="form-control-plaintext fw-fold" data-attr="login_info" id="gUserBirthDay"/>',
        'gUserEmail': '<input type="text" readonly  class="form-control-plaintext fw-fold" data-attr="login_info" id="gUserEmail"/>',
        'gUserName': '<input type="text" readonly  class="form-control-plaintext fw-fold" data-attr="login_info" id="gUserName"/>',
        'gUserNickName': '<input type="text" readonly class="form-control-plaintext fw-fold" data-attr="login_info" id="gUserNickName"/>',
        'gUserUseSePassword': '<input type="text" readonly class="form-control-plaintext fw-fold" data-attr="login_info" id="gUserUseSePassword"/>',
    }

    let html = '';

    //div 생성
    for (prop in value) {
        html += '<div class="mb-3 row">';
        html += '<label class="col-sm-4 col-form-label">';
        html += '<i class="bi-tag-fill me-2" style="color:#198754"></i>';
        html += guserObject[prop];
        html += '</label>';
        html += '<div class="col-sm-8">';
        html += '<div class="row">';
        html += '<div class="col-8">';
        html += guserInput[prop];
        html += '</div>';
        html += '<div class="col-4" id="col-' + prop + '">';
        if (prop != 'gUserEmail') {
            html += '<button type="button" class="btn btn-md btn-success" id="edit-btn-' + prop + '" onclick="EditTextOpen(\'' + prop + '\')">';
            html += '<i class="bi-pencil"></i>';
            html += '</button>';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
    }
    document.getElementById('gUser_info_row').innerHTML = html;

    for (prop in value) {
        document.getElementById(prop).value = value[prop];
    }

}

async function GetUserInfo() {
    let defaultUrl = Object.values(defaultHost())[0];

    fetch(defaultUrl + '/guser', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Authorization': await GetCookieValue('gardenToken'),
        }
    })
        .then(async function (response) {
            let value = await response.json();
            RenderUserInfo(value.data);
        })
}

function CreateUserViewForm() {
    let form = new FormData(document.getElementById('user_info_form'));
    form.append('GUserName', document.getElementById('gUserName').value);
    form.append('GUserNickName', document.getElementById('gUserNickName').value);
    form.append('GUserEmail', document.getElementById('gUserEmail').value);
    form.append('GUserBirthDay', document.getElementById('gUserBirthDay').value);
    form.append('GUserUseSePassword', document.getElementById('gUserUseSePassword').value);

    return form;
}

//정보 수정
async function UpdateInfo(textId) {
    let defaultUrl = Object.values(defaultHost())[0];
    console.log(defaultUrl);
    fetch(defaultUrl+'/guser', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Authorization': await GetCookieValue('gardenToken'),
        },
        body: await CreateUserViewForm()
    })
        .then(async function (response) {
            let value = await response.json();
            if (value.token == true) {
                CloseText(textId);
            }
        });
}


//파일 업로드
async function FileUpload(obj) {
    let defaultUrl = Object.values(defaultHost())[0];
    let form = new FormData(document.getElementById('img_upload_form'));
    form.append('ProfileImg', obj.files[0]);
    fetch(defaultUrl +'/profile_img', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Authorization': await GetCookieValue('gardenToken'),
        },
        body: form
    })
        .then(async function (response) {
            let value = await response.json();
            if (value == true) {
                GetUserInfo();
            }
        });
}
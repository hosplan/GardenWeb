//GardenRootType - 목록 값 불러오기
function LoadBaseTypes() {
    let id = document.getElementById('space_id').value
    fetch(Object.values(gardenSpaceHost())[0] + '/garden_root/space_id='+id+'', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include'
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token == true) {
                RenderGardenRootTypeRow(jsonValue.data);
            }
        });
}

//GardenRootType - 목록 값 표기
function RenderGardenRootTypeRow(data) {
    let row = '';
    data.forEach(e => {
        row += '<tr>';
        row += '<td><button class="btn btn-link p-0 fw-bold" onclick="LoadBaseBranchTypes(' + e.id + ', \'' + e.name + '\')" style="text-decoration:none" type="button">' + e.name + '</button></td>';
        row += '<td>' + e.description + '</td>';
        row += '<td><span class="btn btn-default" style="background-color:' + e.color + '" aria-hidden="true"></span></td>';
        row += '<td>' +
            '<button class="btn btn-link text-success p-0" data-bs-toggle="modal" data-bs-target="#gardenSpaceModal" onclick="RenderUpdateModal(' + e.id + ')" type="button"><i class="bi-brush-fill me-2"></i></button>' +
            '<button class="btn btn-link text-danger p-0" type="button"><i class="bi-trash-fill me-2" onclick="QuestionDelete(' + e.id + ')"></i></button>' +
            '</td>';
        row += '</tr>';
    });
    document.getElementById('baseRootType_tbody').innerHTML = row;
}


//baseRootType - 특정 BaseRootType 정보 가져오기
async function GetBaseRootType(id) {

    let data = await fetch(Object.values(gardenSpaceHost())[0] + '/garden_root/' + id + '', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
    })
        .then((response) => response.json())
        .then(value => {
            console.log(value.data);
            return value.data;
        })
        .catch(error => {
            console.error(error);
        });

    return data;
}

//baseRootType - 수정창에 값 넣기
function PutBaseTypeValue(value) {
    document.getElementById('baseRootType_name').value = value.name;
    document.getElementById('baseRootType_desc').value = value.description;
    document.getElementById('baseRootType_color').value = value.color;
    document.getElementById('baseRootType_id').value = value.id;
}

//baseRootType - 수정 모달창 그리기
async function RenderUpdateModal(id) {
    document.getElementById('garden_basetype_title').innerHTML = 'BaseType 수정';

    let modalBody = '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">이름</label>';
    modalBody += '<input type="hidden" id="baseRootType_id" />';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseRootType_name"  />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">설명</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseRootType_desc"  />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">색상</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="color" class="form-control form-control-color" id="baseRootType_color"  title="색상을 선택하세요" />';
    modalBody += '</div>';
    modalBody += '</div>';

    document.getElementById('modal_body').innerHTML = modalBody;
    await PutBaseTypeValue(await GetBaseRootType(id));

    let modalFooter = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary" onclick="UpdateBaseRootType()" data-bs-dismiss="modal">수정</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}

//baseRootType - 생성 모달창 그리기 
function RenderCreateModal() {
    document.getElementById('garden_basetype_title').innerHTML = 'BaseType 생성';

    let modalBody = '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label">이름</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseRootType_name" />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label">설명</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseRootType_desc" />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label font-weight-bold">색상</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="color" class="form-control form-control-color" id="baseRootType_color" value="#FFF" title="색상을 선택하세요" />';
    modalBody += '</div>';
    modalBody += '</div>';

    document.getElementById('modal_body').innerHTML = modalBody;

    let modalFooter = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary" onclick="CreateBaseRootType()" data-bs-dismiss="modal">생성</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}

//baseRootType - BaseRootType 유효성 체크
function ValidationCheckForBaseRootType() {
    let baseTypeName = document.getElementById('baseRootType_name').value;
    let baseTypeDesc = document.getElementById('baseRootType_desc').value;

    if (baseTypeName == null || baseTypeName == "") {
        return false;
    }
    else if (baseTypeDesc == null || baseTypeDesc == "") {
        return false;
    }
    else {
        return true;
    }
}

//baseRootType - BaseType Form 만들기
function GetBaseRootTypeForm() {
    let baseRootTypeForm = new FormData();

    if (!!document.getElementById('baseRootType_id')) {
        baseRootTypeForm.append('Id', document.getElementById('baseRootType_id').value);
    }

    baseRootTypeForm.append('Name', document.getElementById('baseRootType_name').value);
    baseRootTypeForm.append('Description', document.getElementById('baseRootType_desc').value);
    baseRootTypeForm.append('Color', document.getElementById('baseRootType_color').value);

    return baseRootTypeForm;
}

//baseRootType - 삭제 창 띄우기
function QuestionDelete(id) {

    Swal.fire({
        title: '해당 BaseType을 삭제하실 건가요?',
        icon: 'question',
        html: '<p class="text-danger fw-bolder">관련된 BaseBrachType 또한 삭제가 되요.</p>',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '삭제하기',
        cancelButtonText: '취소'
    }).then((result) => {
        if (result.value) {
            RemoveBaseRootType(id);
        }
    });
}

//baseRootType - 삭제
function RemoveBaseRootType(id) {
    fetch(Object.values(gardenSpaceHost())[0] + '/garden_root', {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: id })
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token == true) {
                LoadBaseTypes();
            }
            else if (jsonValue.token == false) {
                AlertMessage('오류가 발생했네요.. 잠시후에 다시 시도 해 주세요!');
            }
        });
}

//baseRootType - 수정
async function UpdateBaseRootType() {
    if (await ValidationCheckForBaseRootType() == false) {
        return;
    }

    fetch(Object.values(gardenSpaceHost())[0] + '/garden_root', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        body: await GetBaseRootTypeForm()
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token) {
                LoadBaseTypes();
            }
            else if (jsonValue.token == false) {
                AlertMessage('오류가 발생했네요.. 잠시후에 다시 시도 해 주세요!');
            }
        });
}

//baseRootType - 생성
async function CreateBaseRootType() {
    if (await ValidationCheckForBaseRootType() == false) {
        return;
    }

    fetch(Object.values(gardenSpaceHost())[0] + '/garden_root', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        body: await GetBaseRootTypeForm()
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token) {
                LoadBaseTypes();
            }
            else if (jsonValue.token == false) {
                AlertMessage('오류가 발생했네요.. 잠시후에 다시 시도 해 주세요!');
            }
        });
}


//baseBranchType - branchType 생성 버튼 생성
function RenderCreateBranchCreateBtn() {
    let btn = '<button class="btn btn-link p-0 float-end" onclick="RenderBranchCreateModal()" type="button" data-bs-toggle="modal" data-bs-target="#gardenSpaceModal">' +
        '<i class="bi bi-plus-circle-fill"></i>' +
        '</button>';

    document.getElementById('create_base_branch_type_dv').innerHTML = btn;
}

//baseBranchType - 목록 정보 불러오기
function LoadBaseBranchTypes(id, name) {

    RenderCreateBranchCreateBtn();

    document.getElementById('baseBranchType_title').innerHTML = name;
    document.getElementById('relate_baseRootType_id').value = id;

    fetch(Object.values(gardenSpaceHost())[0] + '/garden_branch/root_type=' + id + '', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token == true) {
                RenderBaseBranchRow(jsonValue.data);
            }
        });
}

//baseBranchType - 목록 그리기
function RenderBaseBranchRow(data) {
    let row = '';
    data.forEach(e => {
        row += '<tr>';
        row += '<td class="fw-bold">' + e.name + '</td>';
        row += '<td>' + e.description + '</td>';
        row += '<td><span class="btn btn-default" style="background-color:' + e.color + '" aria-hidden="true"></span></td>';
        row += '<td>' +
            '<button class="btn btn-link text-success p-0" data-bs-toggle="modal" data-bs-target="#gardenSpaceModal" onclick="RenderBranchTypeUpdateModal(' + e.id + ')" type="button"><i class="bi-brush-fill me-2"></i></button>' +
            '<button class="btn btn-link text-danger p-0" type="button"><i class="bi-trash-fill me-2" onclick="QuestionBranchTypeDelete(' + e.id + ')"></i></button>' +
            '</td>';
        row += '</tr>';
    });
    document.getElementById('baseBranchType_tbody').innerHTML = row;
}

//baseBranchType - 특정 BaseRootType 정보 가져오기
async function GetBaseBranchType(id) {

    let data = await fetch(Object.values(gardenSpaceHost())[0] + '/garden_root/' + id + '', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
    })
    .then((response) => response.json())
    .then(value => {
        console.log(value.data);
        return value.data;
    })
    .catch(error => {
        console.error(error);
    });
    return data;
}

//baseBranchType - 수정창에 값 넣기
function PutBaseBranchTypeValue(value) {
    document.getElementById('baseBranchType_name').value = value.name;
    document.getElementById('baseBranchType_desc').value = value.description;
    document.getElementById('baseBranchType_color').value = value.color;
    document.getElementById('baseBranchType_id').value = value.id;
}

//baseBranchType - 수정 모달창 그리기
async function RenderBranchTypeUpdateModal(id) {
    document.getElementById('garden_basetype_title').innerHTML = 'BaseBranchType 수정';

    let modalBody = '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">이름</label>';
    modalBody += '<input type="hidden" id="baseBranchType_id" />';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseBranchType_name"  />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">설명</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseBranchType_desc"  />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">색상</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="color" class="form-control form-control-color" id="baseBranchType_color"  title="색상을 선택하세요" />';
    modalBody += '</div>';
    modalBody += '</div>';

    document.getElementById('modal_body').innerHTML = modalBody;
    await PutBaseBranchTypeValue(await GetBaseBranchType(id));

    let modalFooter = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary" onclick="UpdateBaseBranchType()" data-bs-dismiss="modal">수정</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}



//baseBranchType - 생성 모달창 그리기
function RenderBranchCreateModal() {
    document.getElementById('garden_basetype_title').innerHTML = 'BaseBranchType 생성';

    let modalBody = '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label">이름</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseBranchType_name" />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label">설명</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseBranchType_desc" />';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label font-weight-bold">색상</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="color" class="form-control form-control-color" id="baseBranchType_color" value="#FFF" title="색상을 선택하세요" />';
    modalBody += '</div>';
    modalBody += '</div>';

    document.getElementById('modal_body').innerHTML = modalBody;

    let modalFooter = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary" onclick="CreateBaseBranchType()" data-bs-dismiss="modal">생성</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}

//baseBranchType - BaseRootType 유효성 체크
function ValidationCheckForBaseBranchType() {
    let baseBranchTypeName = document.getElementById('baseBranchType_name').value;
    let baseBranchTypeDesc = document.getElementById('baseBranchType_desc').value;

    if (baseBranchTypeName == null || baseBranchTypeName == "") {
        return false;
    }
    else if (baseBranchTypeDesc == null || baseBranchTypeDesc == "") {
        return false;
    }
    else {
        return true;
    }
}

//baseBranchType - BaseType Form 만들기
function GetBaseBranchTypeForm() {
    let baseBranchTypeForm = new FormData();

    if (!!document.getElementById('baseBranchType_id')) {
        baseBranchTypeForm.append('Id', document.getElementById('baseBranchType_id').value);
    }

    baseBranchTypeForm.append('RootTypeId', document.getElementById('relate_baseRootType_id').value);
    baseBranchTypeForm.append('Name', document.getElementById('baseBranchType_name').value);
    baseBranchTypeForm.append('Description', document.getElementById('baseBranchType_desc').value);
    baseBranchTypeForm.append('Color', document.getElementById('baseBranchType_color').value);

    return baseBranchTypeForm;
}


//baseBranchType - 삭제 창 띄우기
function QuestionBranchTypeDelete(id) {

    Swal.fire({
        title: '해당 BaseBranchType을 삭제하실 건가요?',
        icon: 'question',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '삭제하기',
        cancelButtonText: '취소'
    }).then((result) => {
        console.log(result);
        if (result.value) {
            RemoveBaseBranchType(id);
        }
    });
}


//baseBranchType - 삭제
function RemoveBaseBranchType(id) {
    fetch(Object.values(gardenSpaceHost())[0] + '/garden_branch', {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: id })
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token == true) {
                let obj = GetRootTypeIdAndName();
                LoadBaseBranchTypes(obj.id, obj.name);
            }
            else if (jsonValue.token == false) {
                AlertMessage('오류가 발생했네요.. 잠시후에 다시 시도 해 주세요!');
            }
        });
}


//baseBranchType - 수정
async function UpdateBaseBranchType() {
    if (await ValidationCheckForBaseBranchType() == false) {
        return;
    }

    fetch(Object.values(gardenSpaceHost())[0] + '/garden_branch', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        body: await GetBaseBranchTypeForm()
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token) {
                let obj = GetRootTypeIdAndName();
                LoadBaseBranchTypes(obj.id, obj.name);
            }
            else if (jsonValue.token == false) {
                AlertMessage(jsonValue.data);
            }
        });
}

//rootType 의 id와 name 값 가져오기
function GetRootTypeIdAndName() {
    return {
        id: document.getElementById('relate_baseRootType_id').value,
        name: document.getElementById('baseBranchType_title').textContent
    };
}

//baseBranchType - 생성
async function CreateBaseBranchType() {
    if (await ValidationCheckForBaseBranchType() == false) {
        return;
    }

    fetch(Object.values(gardenSpaceHost())[0] + '/garden_branch', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        body: await GetBaseBranchTypeForm()
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token) {
                let obj = GetRootTypeIdAndName();
                LoadBaseBranchTypes(obj.id, obj.name);
            }
            else if (jsonValue.token == false) {
                AlertMessage(jsonValue.data);
            }
        });
}



//GardenSpace - 대분류 목록 가져오기

//GardenSpace Form 생성
function GenerateGardenSpaceForm() {
    let gardenSpaceForm = new FormData();

    gardenSpaceForm.append('SpaceName', document.getElementById('garden_space_name').value);
    gardenSpaceForm.append('Description', document.getElementById('garden_space_desc').value);
    gardenSpaceForm.append('SpaceTypeName', document.getElementById('garden_space_type_name').value);
    gardenSpaceForm.append('PlanStartDate', document.getElementById('garden_space_plan_start_date').value);
    gardenSpaceForm.append('PlanEndDate', document.getElementById('garden_space_plan_end_date').value);
    gardenSpaceForm.append('StartDate', document.getElementById('garden_space_start_date').value);
    gardenSpaceForm.append('EndDate', document.getElementById('garden_space_end_date').value);

    return gardenSpaceForm;
}

//GardenSpace - 워크스페이스 생성
async function CreateGardenSpace() {
    fetch(Object.values(gardenSpaceHost())[0] + '/garden_space', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'Authorization': await GetCookieValue('gardenToken')
        },
        body: await GenerateGardenSpaceForm()
    }).then(async function (response) {
        let jsonValue = await response.json();
        console.log(jsonValue.token)
        if (jsonValue.token == true) {
            location.reload();
        }
        else {
            AlertMessage(jsonValue.data);
        }
    });
}

//GardenSpace - 상세정보 값 표기
function RenderSpaceDetail(data) {
    document.getElementById('detail_space_name').innerText = data.name;
    document.getElementById('detail_space_creator').value = data.creator;
    document.getElementById('detail_space_create_date').value = data.createDate;
    document.getElementById('detail_space_type_name').value = data.spaceTypeName;
    document.getElementById('detail_space_is_private').value = data.isPrivate;
    document.getElementById('detail_space_only_invite').value = data.onlyInvite;
    document.getElementById('detail_space_plan_start_date').value = data.planStartDate;
    document.getElementById('detail_space_plan_end_date').value = data.planEndDate;
    document.getElementById('detail_space_start_date').value = data.startDate;
    document.getElementById('detail_space_end_date').value = data.endDate;
    document.getElementById('detail_space_description').value = data.description;
    let spaceColor = document.getElementById('detail_space_color');
    console.log(data.color);
    spaceColor.style.backgroundColor = data.color;
}

async function GetGardenInfo() {
    let spaceId = document.getElementById('space_id').value;
    let data = await fetch(Object.values(gardenSpaceHost())[0] + '/garden_space/' + spaceId + '', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
    })
    .then((response) => response.json())
    .then(value => {
        return value.data;
    })
    .catch(error => {
        console.error(error);
    });

    return data;
}

//GardenSpace - 상세정보 값 가져오기
async function GetGardenSpaceDetail() {    
    RenderSpaceDetail(await GetGardenInfo());
}

//GardenSpace - 초대 현황 열기
async function RenderUserInviteModal() {
    //모달 타이틀
    let modalTitle = '<i class="bi bi-plus-circle-fill text-primary me-2"></i>';
    modalTitle += '유저 초대하기';
    document.getElementById('garden_space_modal_title').innerHTML = modalTitle;
    
    //이름
    let modalBody = '<div class="mb-3 row">';
    modalBody += '<div class="col-sm-12 col-xl-6 p-2 border" style="min-height:500px;">';
    modalBody += '<div class="card text-white bg-primary">';
    modalBody += '<div class="card-header">Header</div>';
    modalBody += '<div class="card-body">';
    modalBody += '<h5 class="card-title">Primary card title</h5>';
    modalBody += '<p class="card-text">Some quick example text to build on the card title and make up the bulk of the cards content</p>';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '<div class="col-sm-12 col-xl-6 p-2 border" style="min-height:500px;">';

    modalBody += '</div>';
    modalBody += '</div>';

   

    document.getElementById('modal_body').innerHTML = modalBody;
    let modalFooter = '<button type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary fw-bold" onclick="UpdateGardenSpace()" data-bs-dismiss="modal">초대장 보내기</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}

//GardenSpace - 워크스페이스 수정창 열기
async function RenderUpdateSpaceModal() {
    let data = await GetGardenInfo();
    //모달 타이틀
    let modalTitle = '<i class="bi bi-brush-fill text-success me-2"></i>';
    modalTitle += data.name + ' 수정하기';
    document.getElementById('garden_space_modal_title').innerHTML = modalTitle;
    //이름
    let modalBody = '<div class="mb-3 row">';
    modalBody += '<input type="hidden" value=' + data.id + ' id="update_garden_space_id" />';
    modalBody += '<input type="hidden" value=' + data.creator + ' id="update_garden_space_creator" />';
    modalBody += '<input type="hidden" value='+ data.createDate+' id="update_garden_space_createDate" />'
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">* 이름</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold" id="update_garden_space_name">'+data.name+'</label>';
    modalBody += '</div>';
    modalBody += '</div>';
    //설명
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">설명</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="update_garden_space_desc" value='+data.description+' />';
    modalBody += '</div>';
    modalBody += '</div>';
    //작업종류
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">카테고리</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="update_garden_space_type_name" value=' + data.spaceTypeName +' />';
    modalBody += '</div>';
    modalBody += '</div>';

    //공개 여부
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">비공개 여부</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<div class="form-check form-switch mt-2">';
    if (data.isPrivate == true) {
        modalBody += '<input class="form-check-input" type="checkbox" id="update_garden_space_isprivate" checked/>';
    } else {
        modalBody += '<input class="form-check-input" type="checkbox" id="update_garden_space_isprivate" />';
    }   
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '</div>';

    //초대로만 받기
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">초대로만 받기</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<div class="form-check form-switch mt-2">';
    if (data.onlyInvite == true) {
        modalBody += '<input class="form-check-input" type="checkbox" id="update_garden_space_onlyInvite" checked />';
    } else {
        modalBody += '<input class="form-check-input" type="checkbox" id="update_garden_space_onlyInvite" />';
    }
    modalBody += '</div>';
    modalBody += '</div>';
    modalBody += '</div>';

    //색상
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">색상</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="color" class="form-control form-control-color" value='+data.color+' id="update_garden_space_color"  title="색상을 선택하세요" />';
    modalBody += '</div>';
    modalBody += '</div>';
    //hr
    modalBody += '<hr/>';

    //계획 시작 / 종료 날짜
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">계획 시작 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="update_garden_space_plan_start_date" value=' + data.planStartDate +' />';
    modalBody += '</div>';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">계획 종료 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="update_garden_space_plan_end_date" value=' + data.planEndDate +' />';
    modalBody += '</div>';
    modalBody += '</div>';

    //시작날짜 / 종료 날짜
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">시작 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="update_garden_space_start_date" value=' + data.startDate+' />';
    modalBody += '</div>';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">종료 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="update_garden_space_end_date" value=' + data.endDate +' />';
    modalBody += '</div>';
    modalBody += '</div>';

    document.getElementById('modal_body').innerHTML = modalBody;
    let modalFooter = '<button type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary fw-bold" onclick="UpdateGardenSpace()" data-bs-dismiss="modal">수정</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}

//GardenSpace - 업데이트 항목 Form 형태로 변경
function GetUpdateSpaceForm() {
    let updateGardenSpaceForm = new FormData();

    updateGardenSpaceForm.append('Id', document.getElementById('update_garden_space_id').value);
    updateGardenSpaceForm.append('SpaceName', document.getElementById('update_garden_space_name').text);
    updateGardenSpaceForm.append('Description', document.getElementById('update_garden_space_desc').value);
    updateGardenSpaceForm.append('SpaceTypeName', document.getElementById('update_garden_space_type_name').value);
    updateGardenSpaceForm.append('PlanStartDate', document.getElementById('update_garden_space_plan_start_date').value);
    updateGardenSpaceForm.append('PlanEndDate', document.getElementById('update_garden_space_plan_end_date').value);
    updateGardenSpaceForm.append('StartDate', document.getElementById('update_garden_space_start_date').value);
    updateGardenSpaceForm.append('EndDate', document.getElementById('update_garden_space_end_date').value);
    updateGardenSpaceForm.append('IsPrivate', document.getElementById('update_garden_space_isprivate').checked);
    updateGardenSpaceForm.append('OnlyInvite', document.getElementById('update_garden_space_onlyInvite').checked);
    updateGardenSpaceForm.append('CreatorId', document.getElementById('update_garden_space_creator').value);
    updateGardenSpaceForm.append('CreateDate', document.getElementById('update_garden_space_createDate').value);
    updateGardenSpaceForm.append('Color', document.getElementById('update_garden_space_color').value);

    return updateGardenSpaceForm;
}

//GardenSpace - 워크스페이스 수정
async function UpdateGardenSpace() {
    fetch(Object.values(gardenSpaceHost())[0] + '/garden_space', {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        body: await GetUpdateSpaceForm()
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token == true) {
                GetGardenSpaceDetail();
            }
            else if (jsonValue.token == false) {
                AlertMessage(jsonValue.data);
            }
        });
}

//GardenSpace - 워크스페이스 생성창 열기
function RenderCreateModal() {
    //모달 타이틀
    let modalTitle = '<i class="bi bi-plus-circle-fill text-primary me-2"></i>';
    modalTitle += '작업 공간 만들기';
    document.getElementById('garden_space_modal_title').innerHTML = modalTitle;
    let modalBody = '<div class="mb-3 row">';
    modalBody += '<div class="col-auto">';
    modalBody += '<span class="text-danger badge bg-secondary text-white">Tip) * 표시되어 있는 항목은 반드시 작성 해주세요!</span>';
    modalBody += '</div>';
    modalBody += '</div>';
    //이름
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">* 이름</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="garden_space_name" />';
    modalBody += '</div>';
    modalBody += '</div>';
    //설명
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">설명</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="garden_space_desc" />';
    modalBody += '</div>';
    modalBody += '</div>';
    //작업종류
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">* 카테고리</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="garden_space_type_name" />';
    modalBody += '</div>';
    modalBody += '</div>';
    //hr
    modalBody += '<hr/>';
    //tip
    modalBody += '<div class="mb-3 row">';
    modalBody += '<div class="col-auto">';
    modalBody += '<span class="text-danger badge bg-secondary text-white">Tip) 날짜를 정확히 모르면 넘어가도 괜찮아요.</span>';
    modalBody += '</div>';
    modalBody += '</div>';

    //계획 시작 / 종료 날짜
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">계획 시작 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="garden_space_plan_start_date" />';
    modalBody += '</div>';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">계획 종료 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="garden_space_plan_end_date" />';
    modalBody += '</div>';
    modalBody += '</div>';

    //시작날짜 / 종료 날짜
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">시작 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="garden_space_start_date" />';
    modalBody += '</div>';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">종료 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="garden_space_end_date" />';
    modalBody += '</div>';
    modalBody += '</div>';

    document.getElementById('modal_body').innerHTML = modalBody;

    let modalFooter = '<button type="button" class="btn btn-secondary fw-bold" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary fw-bold" onclick="CreateGardenSpace()" data-bs-dismiss="modal">생성</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}

function RenderGardenSpace(data) {
    data.forEach(function (data) {
        let space = '<div class="card garden_space_card"  style="min-height:490px;">';
        space += '<div class="card-header bg-primary">';
        if (data.planStartDate != null && data.planendDate != null) {
            space += '<span class="badge me-2">2021-12-15 ~ 2021-12-24</span>';
        }

        space += '<button type="button" onclick="Test()" class="btn btn-link btn-xs p-0 me-2 float-end">' +
            '<i class="bi bi-trash-fill text-white"></i>' +
            '</button>';
        space += '<button type="button" class="btn btn-link btn-xs p-0 me-2 float-end">' +
            '<i class="bi bi-brush-fill text-white"></i>' +
            '</button>';
        space += '<button type="button" class="btn btn-link btn-xs p-0 me-2 float-end">' +
            '<i class="bi-envelope-fill text-white"></i>' +
            '</button>';
        space += '<button type="button" class="btn btn-link btn-xs p-0 me-2 float-end">' +
            '<i class="bi-eye-fill text-white"></i>' +
            '</button>';
        space += '</div>';
        space += '<img src="~/img/fondue.jpg" class="card-img-top" style="height:200px;" />';
        space += '<div class="card-body">';
        space += '<h5 class="card-title fw-bold w-100" style="color: #479f76" onclick="DetailGardenSpace(' + data.id + ');">';
        space += '<a href="/GardenSpace/Detail/?id='+data.id+'" class="text-success fw-bolder" style="text-decoration:none;">' + data.spaceName+'</a>';
        space += '<button type="button" class="btn btn-link btn-xs p-0 me-1">' +
            '<i class="bi bi-star text-secondary"></i>' +
            '</button>';
        space += '</h5>';
        space += '<p class="card-text">' + data.description + '</p>';
        space += '<span class="badge bg-primary me-2"><i class="bi-tag-fill text-white me-2"></i>' + data.spaceTypeName + '</span>';
        space += '</div>';
        space += '<div class="card-footer">';
        space += '<div class="row mt-1 mb-2">';
        space += '<div class="col-auto m-auto mt-2 mb-2">';
        space += '<img src="~/img/example.jpg" class="card-img-top" style="height:40px; width:40px; border-radius:100%;" />';
        space += '<img src="~/img/example.jpg" class="card-img-top" style="height:40px; width:40px; border-radius: 100%;" />';
        space += '<img src="~/img/example.jpg" class="card-img-top" style="height:40px; width:40px; border-radius: 100%;" />';
        space += '</div>';
        space += '<small class="col-12 text-center">3명 참가중</small>';
        space += '</div>';
        space += '</div>';
        space += '</div>';
        //space += '</div>';

        let colDiv = document.createElement('div');
        colDiv.innerHTML = space;
        colDiv.classList.add('col-sm-12', 'col-md-6', 'col-xl-4', 'p-2');

        let row = document.getElementById('garden_space_list');
        row.appendChild(colDiv);
    })
    
}
//GardenSpace - 목록 조회
async function LoadGardenSpace() {

    let data = await fetch(Object.values(gardenSpaceHost())[0] + '/garden_space', {
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
            RenderGardenSpace(data.data);
        });


   
}

//GardenSpace - 상세조회
function DetailGardenSpace() {
    location.href = './GardenSpace/Detail';
}


function Test() {
    event.preventDefault();
    alert("Test");
}
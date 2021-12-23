


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
}



//GardenSpace - 상세정보 값 가져오기
function GetGardenSpaceDetail() {
    let spaceId = document.getElementById('space_id').value;
    fetch(Object.values(gardenSpaceHost())[0] + '/garden_space/' + spaceId + '', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
    })
        .then(async function (response) {
            let jsonValue = await response.json();
            if (jsonValue.token == true) {
                RenderSpaceDetail(jsonValue.data);
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

    let modalFooter = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary" onclick="CreateGardenSpace()" data-bs-dismiss="modal">생성</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}

function RenderGardenSpace(data) {
    console.log(data);
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
//워크스페이스 생성창 열기
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
    modalBody += '<input type="text" class="form-control" id="baseRootType_desc" />';
    modalBody += '</div>';
    modalBody += '</div>';
    //설명
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">설명</label>';
    modalBody += '<div class="col-sm-10">';
    modalBody += '<input type="text" class="form-control" id="baseRootType_desc" />';
    modalBody += '</div>';
    modalBody += '</div>';
    //작업종류
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold text-danger">* 작업 종류</label>';
    modalBody += '<div class="col-sm-5">';
    modalBody += '<select class="form-control">';
    modalBody += '<option checked>대분류</option>';
    modalBody += '</select>';
    modalBody += '</div>';
    modalBody += '<div class="col-sm-5">';
    modalBody += '<select class="form-control">';
    modalBody += '<option checked>소분류</option>';
    modalBody += '</select>';
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
    modalBody += '<input type="Date" class="form-control" id="baseRootType_desc" />';
    modalBody += '</div>';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">계획 종료 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="baseRootType_desc" />';
    modalBody += '</div>';
    modalBody += '</div>';

    //시작날짜 / 종료 날짜
    modalBody += '<div class="mb-3 row">';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">시작 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="baseRootType_desc" />';
    modalBody += '</div>';
    modalBody += '<label class="col-sm-2 col-form-label fw-bold">종료 날짜</label>';
    modalBody += '<div class="col-sm-4">';
    modalBody += '<input type="Date" class="form-control" id="baseRootType_desc" />';
    modalBody += '</div>';
    modalBody += '</div>';

    document.getElementById('modal_body').innerHTML = modalBody;

    let modalFooter = '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>';
    modalFooter += '<button type="button" class="btn btn-primary" onclick="UpdateBaseRootType()" data-bs-dismiss="modal">생성</button>';

    document.getElementById('modal_footer').innerHTML = modalFooter;
}


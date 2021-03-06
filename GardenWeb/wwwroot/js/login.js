//로그인
function Login() {
    let garden_id = document.getElementById('garden_id').value;
    let garden_pw = document.getElementById('garden_pw').value;
    let defaultUrl = Object.values(defaultHost())[0];

    fetch(defaultUrl+'/guserlogin', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email: garden_id, Password: garden_pw })
    })
        .then(async function (response) {
            let value = await response.json();
            if (value.token == false) {
                AlertMessage("회원정보가 일치하지 않아요.");
                return false;
            }
            console.log(value.token);
            await SetCookie('gardenToken', value.token);
            let url = '/GardenUser/Index';
     
            if (Number(value.roleId) > 3) {
                url = '/MemberShip/IndexForConfirm';
            }
            MovePage(url);
        });
}


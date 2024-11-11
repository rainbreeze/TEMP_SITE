// 서버에서 사용자 목록을 가져오는 함수
async function fetchUsers() {
    try {
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/users');  // 실제 서버 주소로 변경
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }

        const users = await response.json();
        console.log('받은 사용자 데이터:', users);  // 콘솔에서 받은 데이터 확인

        const userList = document.getElementById('user-list');
        userList.innerHTML = '';  // 기존 내용 초기화

        if (users.length === 0) {
            userList.innerHTML = '<p>사용자 데이터가 없습니다.</p>';
        } else {
            users.forEach(user => {
                const userItem = document.createElement('li');
                userItem.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
                userList.appendChild(userItem);
            });
        }
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
        const userList = document.getElementById('user-list');
        userList.innerHTML = '<p>사용자 목록을 불러오는 데 실패했습니다.</p>';
    }
}

// 사용자를 추가하는 함수
async function addUser(event) {
    event.preventDefault();  // 폼이 제출되지 않도록 방지

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (!response.ok) {
            throw new Error('사용자 추가 오류');
        }

        alert('사용자가 추가되었습니다!');
        fetchUsers();  // 사용자 목록을 다시 불러옴
    } catch (error) {
        console.error('사용자 추가 중 오류 발생:', error);
        alert('사용자 추가에 실패했습니다.');
    }
}

// 페이지가 로드되면 사용자 목록을 가져옴
window.onload = fetchUsers;

// 폼 제출 이벤트 리스너 추가
document.getElementById('add-user-form').addEventListener('submit', addUser);

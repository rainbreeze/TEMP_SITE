// 서버에서 데이터를 가져오는 함수
async function fetchUsers() {
    try {
        // Railway에서 호스팅되는 서버의 /users API 호출
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/users');
        
        // 응답이 정상적이지 않으면 에러 발생
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }

        // JSON 응답 받기
        const users = await response.json();
        console.log('받은 사용자 데이터:', users);  // 콘솔에서 받은 데이터 확인

        // 사용자 목록을 화면에 출력
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';  // 기존 내용 초기화

        // 사용자 목록이 비어 있으면 메시지 출력
        if (users.length === 0) {
            userList.innerHTML = '<p>사용자 데이터가 없습니다.</p>';
        } else {
            // 사용자가 있으면 목록을 추가
            users.forEach(user => {
                const userItem = document.createElement('div');
                userItem.classList.add('user-item');
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

// 페이지가 로드되면 사용자 목록을 가져옴
window.onload = fetchUsers;

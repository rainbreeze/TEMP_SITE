async function redirectToPage(path) {
    try {
        // 경로를 URL 인코딩하여 서버로 전송
        const encodedPath = encodeURIComponent(path);  // 경로를 URL 인코딩
        const response = await fetch(`https://tempserver-production-fe91.up.railway.app/redirecthtml/${encodedPath}`, { method: 'GET' });
        // 서버에서 받은 응답(JSON 형식) 파싱
        const data = await response.json();
        // 서버에서 받은 경로로 리디렉션
        window.location.href = data.redirectTo;

    } catch (error) {
        console.error('오류 발생:', error);
        
        // 오류 발생 시 HTML에 오류 메시지 출력
        const responseOutput = document.getElementById("response-output");
        responseOutput.innerHTML = `<p>오류 발생: ${error.message}</p>`;
        
        alert('페이지 이동에 실패했습니다.');
    }
}

// Login 함수: 역할을 서버에 전달하여 업데이트를 요청
async function Login(role) {
    try {
        const response = await fetch(`https://tempserver-production-fe91.up.railway.app/login/${role}`, {
            method: 'POST',  // POST 요청
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // 서버에서 응답을 받음
        if (!response.ok) {
            throw new Error('서버 요청에 실패했습니다.');
        }

        const data = await response.json();
        
        // 서버 응답 확인
        console.log(data.message); // 응답 메시지 출력

        // 성공 메시지 화면에 표시
        alert(data.message);

    } catch (error) {
        console.error('오류 발생:', error);

        // 오류 메시지 HTML에 표시
        const responseOutput = document.getElementById("response-output");
        responseOutput.innerHTML = `<p>오류 발생: ${error.message}</p>`;
    }
}
// 페이지 리디렉션 함수
async function redirectToPage(path) {
    try {
        // 경로를 URL 인코딩하여 서버로 전송
        const encodedPath = encodeURIComponent(path);  // 경로를 URL 인코딩
        const response = await fetch(`https://tempserver-production-fe91.up.railway.app/redirecthtml/${encodedPath}`, { method: 'GET' });

        // 응답이 정상인지 확인
        if (!response.ok) {
            throw new Error('서버 요청에 실패했습니다.');
        }

        // 서버에서 받은 응답(JSON 형식) 파싱
        const data = await response.json();
        console.log(data);  // 응답 데이터 확인

        // 서버에서 받은 경로로 리디렉션
        if (data.redirectTo) {
            window.location.href = data.redirectTo;
        } else {
            throw new Error('리디렉션 경로가 없습니다.');
        }

    } catch (error) {
        console.error('오류 발생:', error);

        // 오류 발생 시 HTML에 오류 메시지 출력
        const responseOutput = document.getElementById("response-output");
        responseOutput.innerHTML = `<p>오류 발생: ${error.message}</p>`;

        alert('페이지 이동에 실패했습니다.');
    }
}

// 로그인 함수: 역할을 서버에 전달하여 업데이트를 요청
async function Login(role) {
    try {
        const response = await fetch(`https://tempserver-production-fe91.up.railway.app/login/${role}`, {
            method: 'POST',  // POST 요청
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // 응답이 정상인지 확인
        if (!response.ok) {
            throw new Error('서버 요청에 실패했습니다.');
        }

        // 서버에서 응답을 받음
        const data = await response.json();
        console.log(data); // 응답 데이터 확인

        // 성공 메시지 화면에 표시
        alert(data.message);

    } catch (error) {
        console.error('오류 발생:', error);

        // 오류 메시지 HTML에 표시
        const responseOutput = document.getElementById("response-output");
        responseOutput.innerHTML = `<p>오류 발생: ${error.message}</p>`;
    }
}

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

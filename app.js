async function fetchLectures() {
    try {
        // 서버에서 강의 목록을 받아옴
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/lectures'); // 실제 API URL
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }

        const lectures = await response.json();
        const lectureList = document.getElementById('lecture-list');
        lectureList.innerHTML = '';  // 기존 내용 초기화

        if (lectures.length === 0) {
            lectureList.innerHTML = '<p>강의 데이터가 없습니다.</p>';
        } else {
            lectures.forEach(lecture => {
                // 각 강의 항목을 <a> 태그로 감싸서 클릭 시 링크로 이동하도록 만듦
                const lectureItem = document.createElement('a');
                lectureItem.href = lecture.link; // 강의 링크로 이동
                lectureItem.classList.add('lecture-item');
                lectureItem.target = "_blank"; // 새 탭에서 열리게 설정
                lectureItem.style.textDecoration = 'none'; // 링크 기본 스타일 제거

                // 강의 번호 표시
                const lectureNumber = document.createElement('div');
                lectureNumber.classList.add('lecture-number');
                lectureNumber.textContent = `강의 번호: ${lecture.lecturenumber}`;

                // 강의 내용 표시
                const content = document.createElement('div');
                content.classList.add('lecture-content');
                content.textContent = `강의 내용: ${lecture.content}`;

                // 강의 링크 표시 (직접 텍스트로 보여줌)
                const linkContent = document.createElement('div');
                linkContent.classList.add('lecture-link');
                linkContent.textContent = `강의 링크: ${lecture.link}`;

                // 별점 표시
                const rating = document.createElement('div');
                rating.classList.add('lecture-rating');
                rating.textContent = `별점: ${'★'.repeat(lecture.star)}${'☆'.repeat(5 - lecture.star)}`;

                // 좋아요 수 표시
                const good = document.createElement('div');
                good.classList.add('lecture-good');
                good.textContent = `좋아요: ${lecture.good}`;

                // 좋아요 추가 버튼
                const likeButton = document.createElement('button');
                likeButton.textContent = '좋아요 추가';
                likeButton.onclick = () => addLike(lecture.id);

                // 강의 항목에 모든 요소 추가
                lectureItem.appendChild(lectureNumber);  // 강의 번호
                lectureItem.appendChild(content);        // 강의 내용
                lectureItem.appendChild(linkContent);    // 강의 링크
                lectureItem.appendChild(rating);         // 별점
                lectureItem.appendChild(good);           // 좋아요 수
                lectureItem.appendChild(likeButton);     // 좋아요 추가 버튼

                // 리스트에 강의 항목 추가
                lectureList.appendChild(lectureItem);
            });
        }
    } catch (error) {
        console.error('강의 목록을 가져오는 중 오류 발생:', error);
        const lectureList = document.getElementById('lecture-list');
        lectureList.innerHTML = '<p>강의 목록을 불러오는 데 실패했습니다.</p>';
    }
}




// 좋아요 수 증가 함수
async function addLike(lectureId) {
    try {
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/lectures', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: lectureId }),
        });

        if (!response.ok) {
            throw new Error('좋아요 추가 실패');
        }

        // 좋아요 추가 성공 후 목록 새로 고침
        alert('좋아요가 추가되었습니다.');
        fetchLectures();
    } catch (error) {
        console.error('좋아요 추가 중 오류 발생:', error);
        alert('좋아요 추가 실패');
    }
}

// 페이지 로드 시 강의 목록을 가져오는 함수 호출
document.addEventListener('DOMContentLoaded', fetchLectures);

// app.js

// 강의 목록을 가져오는 함수
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
                const lectureItem = document.createElement('li');
                lectureItem.classList.add('lecture-item');

                const content = document.createElement('div');
                content.textContent = `강의 내용: ${lecture.content}`;

                const link = document.createElement('a');
                link.href = lecture.link;
                link.textContent = '강의 링크';
                link.target = "_blank";

                const rating = document.createElement('div');
                rating.textContent = `별점: ${'★'.repeat(lecture.star)}${'☆'.repeat(5 - lecture.star)}`;

                const good = document.createElement('div');
                good.textContent = `좋아요: ${lecture.good}`;

                const likeButton = document.createElement('button');
                likeButton.textContent = '좋아요 추가';
                likeButton.onclick = () => addLike(lecture.id);

                lectureItem.appendChild(content);
                lectureItem.appendChild(link);
                lectureItem.appendChild(rating);
                lectureItem.appendChild(good);
                lectureItem.appendChild(likeButton);

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

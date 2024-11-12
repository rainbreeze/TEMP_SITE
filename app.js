// 강의 목록을 가져오는 함수
async function fetchLectures() {
    try {
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/lectures');
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

                // 강의 내용
                const contentDiv = document.createElement('div');
                contentDiv.innerHTML = `
                    <div class="lecture-number">강의 번호: ${lecture.lecturenumber}</div>
                    <div class="lecture-content">강의 내용: ${lecture.content}</div>
                    <div class="lecture-link">강의 링크: ${lecture.link}</div>
                    <div class="lecture-rating">별점: ${'★'.repeat(lecture.star)}${'☆'.repeat(5 - lecture.star)}</div>
                    <div class="lecture-good">좋아요: ${lecture.good}</div>
                `;
                lectureItem.appendChild(contentDiv);

                // 바로 가기 버튼 (링크로 이동)
                const goToLinkButton = document.createElement('button');
                goToLinkButton.textContent = '바로 가기';
                goToLinkButton.onclick = () => window.open(lecture.link, '_blank');  // 링크 새 탭에서 열기
                lectureItem.appendChild(goToLinkButton);  // 강의 항목에 바로 가기 버튼 추가

                // 좋아요 추가 버튼
                const likeButton = document.createElement('button');
                likeButton.textContent = '좋아요 추가';
                likeButton.onclick = () => addLike(lecture.id); // 좋아요 추가 시 해당 강의에 대한 좋아요 추가
                lectureItem.appendChild(likeButton);  // 강의 항목에 좋아요 버튼 추가

                // 삭제 버튼
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '강의 삭제';
                deleteButton.onclick = () => deleteLecture(lecture.id); // 삭제 버튼 클릭 시 해당 강의 삭제
                lectureItem.appendChild(deleteButton);  // 강의 항목에 삭제 버튼 추가

                // 강의 항목을 리스트에 추가
                lectureList.appendChild(lectureItem);
            });
        }
    } catch (error) {
        console.error('강의 목록을 가져오는 중 오류 발생:', error);
        const lectureList = document.getElementById('lecture-list');
        lectureList.innerHTML = '<p>강의 목록을 불러오는 데 실패했습니다.</p>';
    }
}

// 강의 삭제 함수
async function deleteLecture(lectureId) {
    const response = await fetch(`https://tempserver-production-fe91.up.railway.app/lectures/${lectureId}`, { method: 'DELETE' });
    if (response.ok) {
        alert('강의가 삭제되었습니다.');
        fetchLectures();  // 목록 새로 고침
    } else {
        alert('강의 삭제 실패');
    }
}

// 좋아요 수 증가 함수
async function addLike(lectureId) {
    const response = await fetch('https://tempserver-production-fe91.up.railway.app/lectures', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: lectureId })
    });

    if (response.ok) {
        alert('좋아요가 추가되었습니다.');
        fetchLectures();  // 목록 새로 고침
    } else {
        alert('좋아요 추가 실패');
    }
}

// 강의 추가 함수
async function addLecture() {
    const lecturenumber = document.getElementById('lecturenumber').value;
    const content = document.getElementById('content').value;
    const link = document.getElementById('link').value;
    const star = document.getElementById('star').value;
    const good = document.getElementById('good').value; // 좋아요 수

    if (!lecturenumber || !content || !link || !star) {
        alert('모든 필드를 입력하세요.');
        return;
    }

    const newLecture = {
        lecturenumber: lecturenumber,
        content: content,
        link: link,
        star: parseInt(star, 10),
        good: parseInt(good, 10),  // 좋아요 수도 포함
    };

    const response = await fetch('https://tempserver-production-fe91.up.railway.app/lectures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLecture),
    });

    if (response.ok) {
        alert('강의가 추가되었습니다.');
        fetchLectures();  // 강의 목록 갱신
    } else {
        alert('강의 추가 실패');
    }
}

// 페이지 로드 시 강의 목록을 가져오는 함수 호출
document.addEventListener('DOMContentLoaded', fetchLectures);

// 강의 추가 버튼 클릭 시
document.getElementById('add-lecture-btn').addEventListener('click', addLecture);

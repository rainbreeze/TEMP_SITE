// 강의 목록을 가져오는 함수
async function fetchLectures() {
    try {
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/lectures');
        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }

        const lectures = await response.json();

        // 각 강의 번호에 맞는 리스트에 강의 항목 추가
        const lectureList1 = document.getElementById('lectureList1');
        const lectureList2 = document.getElementById('lectureList2');
        const lectureList3 = document.getElementById('lectureList3');
        const lectureList4 = document.getElementById('lectureList4');

        // 각 리스트 초기화
        lectureList1.innerHTML = '';
        lectureList2.innerHTML = '';
        lectureList3.innerHTML = '';
        lectureList4.innerHTML = '';

        if (lectures.length === 0) {
            lectureList1.innerHTML = '<p>강의 데이터가 없습니다.</p>';
            lectureList2.innerHTML = '<p>강의 데이터가 없습니다.</p>';
            lectureList3.innerHTML = '<p>강의 데이터가 없습니다.</p>';
            lectureList4.innerHTML = '<p>강의 데이터가 없습니다.</p>';
        } else {
            lectures.forEach(lecture => {
                const lectureItem = document.createElement('li');
                lectureItem.classList.add('lecture-item');

                // 강의 내용
                const contentDiv = document.createElement('div');
                contentDiv.innerHTML = `
                    <div class="lecture-number">Lecture: ${lecture.lecturenumber}</div>
                    <div class="lecture-content">포스팅 내용: ${lecture.content}</div>
                    <div class="lecture-link">포스팅 링크: <a href="${lecture.link}" target="_blank">${lecture.link}</a></div>
                    <div class="lecture-rating">별점: ${'★'.repeat(lecture.star)}${'☆'.repeat(5 - lecture.star)}</div>
                    <div class="lecture-good">좋아요: ${lecture.good}</div>
                `;
                lectureItem.appendChild(contentDiv);

                // 삭제 버튼
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = '삭제';
                deleteBtn.onclick = () => deleteLecture(lecture.id);
                lectureItem.appendChild(deleteBtn);

                // 좋아요 버튼
                const likeBtn = document.createElement('button');
                likeBtn.textContent = '좋아요';
                likeBtn.onclick = () => addLike(lecture.id);
                lectureItem.appendChild(likeBtn);

                // 강의 번호에 따라 각 리스트에 추가
                if (lecture.lecturenumber === 1) {
                    lectureList1.appendChild(lectureItem);
                } else if (lecture.lecturenumber === 2) {
                    lectureList2.appendChild(lectureItem);
                } else if (lecture.lecturenumber === 3) {
                    lectureList3.appendChild(lectureItem);
                } else if (lecture.lecturenumber === 4) {
                    lectureList4.appendChild(lectureItem);
                }
            });
        }
    } catch (error) {
        console.error('강의 목록을 가져오는 중 오류 발생:', error);
        alert('강의 목록을 불러오는 데 실패했습니다.');
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
// 강의 추가 함수
async function addLecture(event) {
    event.preventDefault(); // 기본 폼 제출 방지

    const lecturenumber = document.getElementById('lecturenumber').value;
    const content = document.getElementById('content').value;
    const link = document.getElementById('link').value;
    const star = parseInt(document.getElementById('star').value);

    if (!lecturenumber || !content || !link || !star) {
        alert("모든 필드를 채워주세요.");
        return;
    }

    // "좋아요" 값을 0으로 고정
    const good = 0;

    const newLecture = {
        lecturenumber: parseInt(lecturenumber),
        content,
        link,
        star,
        good
    };

    try {
        const response = await fetch('https://tempserver-production-fe91.up.railway.app/lectures', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLecture)
        });

        if (response.ok) {
            alert('강의가 추가되었습니다.');
            fetchLectures();  // 목록 새로 고침
        } else {
            alert('강의 추가 실패');
        }
    } catch (error) {
        console.error('강의 추가 중 오류 발생:', error);
        alert('강의 추가 실패');
    }
}

// 강의 추가 버튼 이벤트 리스너
document.getElementById('add-lecture-btn').addEventListener('click', addLecture);

// 페이지 로드 시 강의 목록을 가져오는 함수 호출
document.addEventListener('DOMContentLoaded', fetchLectures);

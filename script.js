// --- 섹션 2: 방탈출 퀴즈 ---
document.addEventListener('DOMContentLoaded', () => {
    const quizArea = document.getElementById('quiz-area');
    const finalSubmitBtn = document.getElementById('quiz-submit-btn');
    const quizResult = document.getElementById('quiz-result');

    // [난이도 하] 주관식 10문제
    const subjectiveQuizzes = [
        {
            story: "🌾 임무 1: 쌀 생산량을 늘려라! 벼를 못자리에서 길러 옮겨 심어 노동력은 줄이고 생산량은 늘린 이 농법은 무엇일까?",
            answer: "모내기법"
        },
        {
            story: "🥕 임무 2: 돈 되는 작물을 찾아라! 쌀뿐만 아니라 인삼, 담배, 목화처럼 팔기 위해 재배하는 이 작물들을 무엇이라 부를까?",
            answer: "상품 작물"
        },
        {
            story: "📜 임무 3: 시장에 진출하라! 대동법이 시행되면서, 나라에 쌀, 옷감 등을 바치는 대신 물품을 사서 바치는 상인들이 등장했어. 이들은?",
            answer: "공인"
        },
        {
            story: "🪙 임무 4: 전국을 누벼라! 조선 후기 상업이 발달하며 전국 어디서나 통용된 이 동전의 이름은?",
            answer: "상평통보"
        },
        {
            story: "🎪 임무 5: 5일마다 다시 만나! 보부상들이 물건을 사고팔기 위해 5일마다 전국 각지를 돌며 열었던 이 시장은?",
            answer: "장시"
        },
        {
            story: "🚢 임무 6: 국경에서 무역하라! 개성을 근거지로 청나라, 일본과 중개 무역을 하며 부를 쌓은 대상인은?",
            answer: "송상"
        },
        {
            story: "📜 임무 7: 신분을 사자! 돈만 내면 이름이 빈 관직 임명장을 살 수 있다더군! 이 종이의 이름은?",
            answer: "공명첩"
        },
        {
            story: "📖 임무 8: 가문을 만들자! 돈으로 양반 신분을 샀으니, 이제 우리 가문의 역사를 기록한 이 책도 사야겠어.",
            answer: "족보"
        },
        {
            story: "📉 임무 9: 몰락한 이웃... 벼슬도 못하고 가난해져서 농민과 다를 바 없게 된, 몰락한 양반들을 무엇이라 부를까?",
            answer: "몰락 양반" // 또는 향반, 잔반 (채점 시 복수 정답)
        },
        {
            story: "🏃‍♂️ 임무 10: 자유를 찾아서! 순조 임금님이 나라에 소속된 많은 노비들을 해방시켜 주셨어! 이 노비들은?",
            answer: "공노비"
        }
    ];

    // [난이도 중] 객관식 5문제
    const objectiveQuizzes = [
        {
            question: "1. 조선 후기 경제 발달에 대한 설명으로 *틀린* 것은?",
            options: [
                "모내기법이 보급되어 쌀 생산량이 늘었다.",
                "민영 광산에서 광물 채굴이 활발해졌다.",
                "관청에 소속된 장인 중심의 관영 수공업이 발달했다.",
                "포구를 중심으로 상업이 발달했다."
            ],
            answer: "관청에 소속된 장인 중심의 관영 수공업이 발달했다."
        },
        {
            question: "2. 대동법이 상업 발달에 큰 영향을 준 가장 큰 이유는?",
            options: [
                "노비의 신분 상승을 가능하게 해서",
                "양반의 수를 크게 증가시켜서",
                "물품을 대량으로 유통시키는 '공인'을 등장시켜서",
                "서얼의 관직 진출을 허용해서"
            ],
            answer: "물품을 대량으로 유통시키는 '공인'을 등장시켜서"
        },
        {
            question: "3. 조선 후기 신분제 변동에 대한 설명으로 *옳은* 것은?",
            options: [
                "양반의 수가 크게 줄어들었다.",
                "상민과 노비의 수가 크게 늘어났다.",
                "중인들의 지위는 변동이 없었다.",
                "부를 축적한 상민이 양반으로 신분 상승을 하기도 했다."
            ],
            answer: "부를 축적한 상민이 양반으로 신분 상승을 하기도 했다."
        },
        {
            question: "4. 지도에서 의주(A)를 거점으로 청과 무역을 주도한 대상인으로 옳은 것은? ",
            options: [
                "송상 (개성)",
                "만상 (의주)",
                "내상 (동래)",
                "경강상인 (한강)"
            ],
            answer: "만상 (의주)"
        },
        {
            question: "5. 조선 후기 서얼들이 차별을 없애기 위해 꾸준히 벌인 신분 상승 운동의 주된 내용은?",
            options: [
                "상평통보를 폐지해달라.",
                "모내기법을 금지해달라.",
                "관직 진출의 차별을 없애달라.",
                "족보를 자유롭게 만들게 해달라."
            ],
            answer: "관직 진출의 차별을 없애달라."
        }
    ];

    let currentMission = 0;
    let correctSubjectiveAnswers = 0;

    // 주관식 퀴즈 생성 및 표시
    function showNextMission() {
        if (currentMission < subjectiveQuizzes.length) {
            const quiz = subjectiveQuizzes[currentMission];
            quizArea.innerHTML += `
                <div classs="quiz-mission active">
                    <h4>${quiz.story}</h4>
                    <input type="text" id="subjective-answer-${currentMission}" placeholder="답을 입력하세요...">
                    <button onclick="checkSubjectiveAnswer(${currentMission})">임무 완수</button>
                    <div id="feedback-${currentMission}" class="quiz-feedback"></div>
                </div>
            `;
            // 이전 미션 숨기기 (선택 사항)
            if(currentMission > 0) {
                 quizArea.querySelector(`.quiz-mission:nth-child(${currentMission})`).style.display = 'none';
            }
        } else {
            // 주관식 완료 후 객관식 표시
            showObjectiveQuizzes();
        }
    }

    // 주관식 채점
    window.checkSubjectiveAnswer = (index) => {
        const input = document.getElementById(`subjective-answer-${index}`);
        const feedback = document.getElementById(`feedback-${index}`);
        const userAnswer = input.value.trim();
        const correctAnswer = subjectiveQuizzes[index].answer;

        let isCorrect = false;

        // 9번 문제 복수 정답 처리
        if (index === 8 && (userAnswer === "몰락 양반" || userAnswer === "향반" || userAnswer === "잔반")) {
            isCorrect = true;
        } else if (userAnswer === correctAnswer) {
            isCorrect = true;
        }

        if (isCorrect) {
            feedback.textContent = "정답입니다! 다음 임무로 넘어갑니다.";
            feedback.className = "quiz-feedback correct";
            input.disabled = true;
            correctSubjectiveAnswers++;
            currentMission++;
            setTimeout(showNextMission, 1000); // 1초 후 다음 문제
        } else {
            feedback.textContent = "틀렸습니다. 다시 생각해보세요!";
            feedback.className = "quiz-feedback incorrect";
        }
    }

    // 객관식 퀴즈 생성
    function showObjectiveQuizzes() {
        quizArea.innerHTML = `
            <div class="objective-quiz-box">
                <h3>[난이도 중] 최종 임무!</h3>
                <p>이제 당신의 지식을 증명할 시간입니다. 다음 5문제를 해결하고 운명을 개척하세요!</p>
                ${objectiveQuizzes.map((quiz, index) => `
                    <div class="objective-question">
                        <p>${quiz.question.replace("", "🗺️")}</p>
                        ${quiz.options.map((option, i) => `
                            <label>
                                <input type="radio" name="objective-q-${index}" value="${option}">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
        finalSubmitBtn.style.display = 'block';
    }

    // 객관식 최종 채점
    finalSubmitBtn.addEventListener('click', () => {
        let correctObjectiveAnswers = 0;
        objectiveQuizzes.forEach((quiz, index) => {
            const selected = document.querySelector(`input[name="objective-q-${index}"]:checked`);
            if (selected && selected.value === quiz.answer) {
                correctObjectiveAnswers++;
            }
        });

        const totalScore = correctSubjectiveAnswers + correctObjectiveAnswers;
        quizResult.textContent = `[퀴즈 결과] 총 15문제 중 ${totalScore}문제를 맞혔습니다! 조선 후기 전문가로 인정합니다! 👍`;
        finalSubmitBtn.disabled = true;
    });

    // 첫 번째 미션 시작
    showNextMission();
});


// --- 섹션 3: 역사 토론방 ---
function submitOpinion(type) {
    const board = document.getElementById('opinion-board');
    let answerText = '';
    let questionTitle = '';

    if (type === 'conceptual') {
        answerText = document.getElementById('conceptual-answer').value;
        questionTitle = '🤔 개념 질문';
        document.getElementById('conceptual-answer').value = '';
    } else {
        answerText = document.getElementById('debatable-answer').value;
        questionTitle = '⚖️ 논쟁 질문';
        document.getElementById('debatable-answer').value = '';
    }

    if (answerText.trim() === '') {
        alert("의견을 입력해주세요!");
        return;
    }

    const newOpinion = document.createElement('div');
    newOpinion.className = 'opinion-item';
    newOpinion.innerHTML = `<strong>${questionTitle}:</strong><p>${answerText}</p>`;
    
    // 새 의견을 맨 위에 추가
    board.prepend(newOpinion);
}
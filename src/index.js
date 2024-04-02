//전역 변수로 타이머의 상태와 남은 시간(초)를 관리한다.
let timerId = null;
let timeLeft;
//화면에 남은 시간을 표시하는 함수
function updateTimeDisplay() {
  //남은 시간을 시 분 초로 변환
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  //화면에 시간을 표시, 한자리 수 일때는 앞에 0을 붙여 두자리로 만듬
  document.getElementById("time-display").textContent = `${String(
    hours
  ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}
//타이머 시작하는 함수
function startTimer() {
  //입력 필드에서 시간, 분, 초를 읽어 정수로 변환. 입력되지 않은 경우 0으로 처리
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  if (timerId === null) {
    timeLeft = hours * 3600 + minutes * 60 + seconds;
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft -= 1;
        updateTimeDisplay();
      } else {
        alert("타임오버!");
        clearInterval(timerId);
        timerId = null;
      }
    }, 1000);
  }
}

//타이머 정지하는 함수
function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

//타이머 리셋하는 함수
function resetTimer() {
  stopTimer();
  timeLeft = 0;
  updateTimeDisplay();
  document.getElementById("hours").value = "";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("stop").addEventListener("click", stopTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

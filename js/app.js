
var enterButton = document.getElementById("addTaskBtn");
enterButton.addEventListener("click", addTaskAfterClick);
var input = document.getElementById("taskInput");
input.addEventListener("keypress", addTaskAfterKeypress);
var ul = document.querySelector("ul");
//var item = document.getElementsByTagName("li");

const background = document.getElementById('background');
const password = document.getElementById('password');
const eyeicon = document.getElementById('eye');

input.addEventListener('input',(e)=>{


    const input = e.target.value;
    const inlength = input.length;
    // console.log(inlength);
     //console.log(20 -( inlength * 2));
    
     const blurvalue= 20 - inlength * 2;
    
     background.style.filter = `blur(${blurvalue}px)`;
    
    });

function addTaskAfterClick() {
  //Do not allow an empty task name
  if (inputLength() > 0) {
    createTaskPanel();
  }
}

function addTaskAfterKeypress(event) {
  //when task name is not empty and hit enter button
  if (inputLength() > 0 && event.which === 13) {
    createTaskPanel();
  }
}

function inputLength() {
  return input.value.length;
}

function createTaskPanel() {
  var time = 0;
  var running = 0;

  var resetTimer = false;
  //create a task element and add to ul
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(input.value));
  ul.appendChild(li);
  //clear text input field
  input.value = "";
  //add del button
  var delBtn = document.createElement("button");
  //delBtn.appendChild(document.createTextNode("X"));
  delBtn.innerHTML = "<i class='fa fa-trash'></i>";

  li.appendChild(delBtn);
  delBtn.addEventListener("click", deleteListItem);

  //add timer
  var timerSpan = document.createElement("span");
  timerSpan.setAttribute("id", "stopWatchDisplay");
  timerSpan.classList.add("timerDisplay");
  timerSpan.innerHTML = "00:00:00";
  li.appendChild(timerSpan);

  //add start button
  var startBtn = document.createElement("button");
  startBtn.innerHTML = "<span><i class='fa fa-play-circle'></i></span>";
  startBtn.setAttribute("id", "startBtn");
  li.appendChild(startBtn);
  startBtn.addEventListener("click", startTimer);
  //delete a task by setting display:none

  //add pause button
  var pauseBtn = document.createElement("button");
  //delBtn.appendChild(document.createTextNode("X"));
  pauseBtn.innerHTML = "<span><i class='fa fa-pause-circle'></i></span>";
  pauseBtn.setAttribute("id", "pauseBtn");

  li.appendChild(pauseBtn);
  pauseBtn.addEventListener("click", pauseTimer);
  //delete a task by setting display:none

  //add stop button
  var stopBtn = document.createElement("button");
  stopBtn.innerHTML = "<span><i class='fa fa-check-circle'></i></span>";
  stopBtn.setAttribute("id", "stopBtn");

  li.appendChild(stopBtn);
  stopBtn.addEventListener("click", stopTimer);

  function pauseTimer() {
    li.classList.add("paused");
    li.classList.remove("started");
    li.classList.remove("done");
    running = 0;
    startBtn.enabled = true;
    pauseBtn.enabled = false;
    stopBtn.enabled = true;
    // console.log("pause:" + resetTimer);
  }
  function startTimer() {
    //console.log("start enter:" + resetTimer);
    //The classList property is not supported in Internet Explorer 9 and earlier versions.
    //li.classList.toggle("started");
    if (resetTimer) {
      reset();
    }

    if (running == 0) {
      running = 1;
      increment(timerSpan);
      startBtn.enabled = false;
      pauseBtn.enabled = true;
      stopBtn.enabled = true;
    }

    li.classList.add("started");
    li.classList.remove("paused");
    li.classList.remove("done");
    // console.log("start exit:" + resetTimer);
  }

  function stopTimer() {
    li.classList.add("done");
    li.classList.remove("paused");
    li.classList.remove("started");
    running = 0;
    startBtn.enabled = true;
    pauseBtn.enabled = false;
    stopBtn.enabled = false;
    resetTimer = true;
    // console.log("stop:" + resetTimer);
  }
  function reset() {
    running = 0;
    time = 0;
    resetTimer = false;
    timerSpan.innerHTML = "00:00:00";
  }
  function increment() {
    if (running == 1) {
      setTimeout(function() {
        time++;
        var mins = Math.floor(time / 10 / 60) % 60;
        var secs = Math.floor(time / 10) % 60;
        var tenths = time % 10;

        if (mins < 10) {
          mins = "0" + mins;
        }
        if (secs < 10) {
          secs = "0" + secs;
        }

        timerSpan.innerHTML = mins + ":" + secs + ":" + "0" + tenths;
        increment();
      }, 100);
    }
  }

  //delete a task by setting display:none
  function deleteListItem() {
    //The classList property is not supported in Internet Explorer 9 and earlier versions.
    li.classList.add("delete");
  }
}


// Event Listener
password.addEventListener('input',(e)=>{


const input = e.target.value;
const inlength = input.length;
// console.log(inlength);
 //console.log(20 -( inlength * 2));

 const blurvalue= 20 - inlength * 2;

 background.style.filter = `blur(${blurvalue}px)`;

});

eyeicon.addEventListener('click',()=>{
    // console.log('hay');
   
    if(eyeicon.classList.contains('fa-eye')){
        console.log('show password');
       
        //Method 1
        // eyeicon.classList.remove('fa-eye');
        // eyeicon.classList.add('fa-eye-slash');

        //Method 2
        eyeicon.classList.replace('fa-eye','fa-eye-slash');

        password.setAttribute("type","text");

        //eyeicon.textContent = "close";

    }
    else{
        console.log('hide password');

        eyeicon.classList.replace('fa-eye-slash','fa-eye');

        password.setAttribute("type","password");

        //eyeicon.textContent = "eye";
    }




});
/**
Functions in Sequential Task
**/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function loadFacePool(start,end) { //the start and ending index of the images
  var pool = [];
  for(i = start; i < (end+1); i++){
     pool.push( 'img/A' + i + '.jpg'); pool.push( 'img/B' + i + '.jpg');
     pool.push( 'img/C' + i + '.jpg'); pool.push( 'img/D' + i + '.jpg');}
  return pool;
}

function loadStimulus(end) { //the start and ending index of the images
  var list = [];
  for(i = 1; i < (end+1); i++){
    list.push( 'stimulus/' + i + '.jpg');}
  return list;
}

function getStim (){
  Face.stim =  Face.stims.shift();
  return Face.stim; //get last stim of the stim list
}

function check_consent (){
  if ($('#consent_checkbox').is(':checked')) {
    return true;
  }else {
    alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
    return false;}
}

function checkID (){
  var lasttrialdata = jsPsych.data.getLastTrialData().select('responses').values[0];
  var textInput = JSON.parse(lasttrialdata).Q0;
  var patt = new RegExp("^[a-zA-Z_0-9]{1,}$"); //the first and last character (this doesn't allow punctuations)
    if (!patt.test(textInput)){      //test if first/last character in response exist
      alert("Please, enter your participant id");
      return true; }
    else{ return false;}
}

function checkUser (){//check if user has been in list of
  var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
  var userID = JSON.parse(inputText).Q0;
  if(userList.responseText.includes(userID)){
    alert('It seems that you have participated in the experiment before. Thank you for your participation!');
    window.close();
    return true;
  } else { return false;}
}

function checkAnswer (){
  var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
  var text = JSON.parse(inputText).Q0;
  var patt = new RegExp("[A-Za-z0-9 _.,!'/$]"); // this allows punctuations
  if (!patt.test(inputText  )){      //test if first/last character in response exist
    alert("Please describe the image just showed in a few words (this will be uses for validation purposes)");
    return true; }
  else{ return false;}
}

function checkPhone (){
  var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
  if(choice == 0){
    alert('As mentioned in the study description, this study can only be done a computer and would not work on a smartphone. Your experiment will be terminated and the window will be closed.');
    window.close();
    return true;
  } else { return false;}
}

  function getWord (){ //get a word for attention check from the word list
    Face.word = Face.wordList.shift();
    return Face.word;
  }

  function checkTyping(){  //test if type correctly
    var inputText = jsPsych.data.getLastTrialData().select('responses').values[0];
    var text = JSON.parse(inputText).Q0;
    if (Face.word !== text){
      falseAnswer += 1;
      alert("Attention! Please type the word correctly. If the alert shows up for 4 times, the experiment will be automatically terminated.");
      Face.wordList.unshift(Face.word);
      if (falseAnswer == falseAllowance){ //if participant gets alert this number of times
        alert("Hi! You've made too much errors in typing the word suggesting that you are not paying attention to the task. The task will be Terminated");
        window.close();
      }else{return true;} }
    else {falseAnswer = 0; return false} //reset falseAnswer
  }

  function getTimeAndFace (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]);

    //choose face_itive or negative valence before displaying faces
    Face.emotionX = getRandomElement([50, 100]); //randomly choose from negative and face_tive emotion
    //choose the identity of the face
    Face.personX = getRandomElement(['A','B','C','D']); //randomally choose from ['A','B','C','D'] -- select person

    return Face.fixationTime;
  }

  function getStarNumber (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.NumStars = getRandomElement([1, 2, 3, 4, 5]);
    return Face.NumStars;
  }

  function getDistraction_task (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    var NumStars = getStarNumber ();
    Face.distraction_task = [];
    temp_array = [];
    for (var i = 0; i < NumStars; i++) { //three practice trials
      temp_array.push("img/star.png")
    }
    Face.distraction_task[0] = temp_array;
    return Face.distraction_task;
  }

  function randomized_order (taskNumber_sequential) {
    var array = ["Normal","Distraction"];
    for (var i = 0; i < taskNumber_sequential; i++) { //three practice trials
      temp = getRandomElement(["Distraction", "Normal"]);
      array.push(temp)
    }
    return array
  }

  function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]);
    return Face.fixationTime;
  }

  function getFaceSample (){  //get the sample of faces in each trial
    Face.singleFace = getRandomInt(1, 50);
    Face.image = ('img/'+ Face.personX +(Face.emotionX + Face.singleFace)+'.jpg')
    return Face.image;
  }


  function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray
    var scale = [];
    for(i = 1; i < (50+1); i++){
       scale.push('img/'+Face.personX+(Face.emotionX +i) + '.jpg')}
    return scale;
  }

  function morphedScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray
    // defining a few helper functions
    function nrange(size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt);
    };
    function generateSlices(vWidth, nSlices){
      var step = vWidth/nSlices;
      var bounds = [];
      for (var i = 0; i < nSlices; i++) {
        bounds.push([(i*step), (i*step)+step]);
      };
      return bounds
    };
    // start trial timer
    var startTime = (new Date()).getTime();
    // get trial data
    var trialData = jsPsych.currentTrial();

    // remove the picture scales and the slider
    $('.jspsych-image-slider-response_noButton-container').remove();
    $('img').remove();
    var imgScale = getScale();
    // drop the first element of the img scale
    imgScale = imgScale.slice(1,imgScale.length)
    // derive the letter of the image filenames
    var imgBase = imgScale[0].split('img/')[1].split('.jpg')[0].replace(/\d+/g, '');
    // split the number of the image filenames off from the rest of it
    var nScale = [];
    for (var i = 0; i < imgScale.length; i++) {
      var n = imgScale[i].split('img/')[1].split('.jpg')[0].split(imgBase)[1];
      nScale.push(n);
    };
    // calculate the element width, and slice it up into sections
    var vWidth = $(document).width();
    var nSlices = nScale.length;
    var slices = generateSlices(vWidth, nSlices);

    // setting up iniital vertical line to start the mousemove functionality
    var vHeight = $(document).height()-8;
    var lineSlice = vWidth / 10;
    var vertLine = `<div style="border-left:black;border-style:solid;margin-left:${lineSlice}px; height:${vHeight}px;width:0px;position:absolute;" id="vertLine"></div>`;
    var linePrompt = `<div id="linePrompt"><div style="font-size:50px;position:absolute;margin-left:${lineSlice*1.3}px;margin-top:${vHeight/2}px"></div><div style="position:absolute;margin-left:${lineSlice*1.2}px;margin-top:${vHeight/2}px;z-index:5;">Move mouse left of the line to begin</div></div>`
    $(".jspsych-content-wrapper").prepend(vertLine);
    $(".jspsych-content-wrapper").prepend(linePrompt);
    // hide prompt until the trial is begun
    $('#jspsych-content > p').css("visibility", "hidden");

    // initialize the central image with the most neutral one (i.e. from
    // the middle of the scale) and set the image to be blurred
    var initialImage = imgScale[0] ; //imgScale[Math.floor(imgScale.length/2)];
    $('#jspsych-image-slider-response_noButton-stimulus').append(`<img src="${initialImage}" style="filter:blur(4px);visibility:hidden;" id="changeable-image"/>`);


    // workaround with a global variable
    window.__imageMouseOver = {
      lineSlice: lineSlice,
      slices: slices,
      nScale: nScale,
      imgBase: imgBase,
      startTime: startTime,
      trialData: trialData,
      sliceSelected: 0,
    };
    var __listenerBools = {};

    // define mousemove event listener that changes image
    function changeImg(event){
      var mouseX = Math.floor(event.pageX);
      for (var i = 0; i < __imageMouseOver.slices.length; i++) {
        // if mouse X position is within the bounds of the X axis slice,
        // change the image to one that is indexed to that slice
        if (mouseX >= __imageMouseOver.slices[i][0] && mouseX <= __imageMouseOver.slices[i][1]) {
          // capture which slice is selected
          __imageMouseOver.sliceSelected = i;
          // update img src to the picture that corresponds to that slice
          $('#changeable-image').attr('src', `img/${__imageMouseOver.imgBase}${__imageMouseOver.nScale[i]}.jpg`);
        }
      };
    };
    // define the click listener that ends trial
    function clickHandler(event){
      if (__listenerBools['mousemove']) {
        // derive trial data
        var trialData = __imageMouseOver.trialData;
        var end_time = (new Date()).getTime();
        var rt = end_time - __imageMouseOver.startTime;
        trialData['rt'] = rt;
        trialData['stimulus_duration'] = rt;
        trialData['trial_duration'] = rt;
        trialData['imageSelected'] = `${__imageMouseOver.imgBase}${__imageMouseOver.nScale[__imageMouseOver.sliceSelected]}.jpg`
        trialData['indexSelected'] = __imageMouseOver.sliceSelected;
        // turn off listeners
        $(document).off('mousemove');
        $(document).off('click');
        // clean up variable namespaces
        delete window.__imageMouseOver
        delete __listenerBools;
        // finish the trial with trial data
        jsPsych.finishTrial(trialData);
      };
    };

    function verticalLineInit(event){
      var mouseX = Math.floor(event.pageX);
      if (mouseX <= __imageMouseOver.lineSlice) {
        $("#vertLine").remove();
        $("#linePrompt").remove();
        $("#jspsych-image-slider-response_noButton-stimulus > img").css({
          "filter":"blur(0px)",
          "visibility": "visible",
        });
        $('#jspsych-content > p').css("visibility", "visible");
        __listenerBools['mousemove'] = true;
        // turn off THIS mouse move listener
        $(document).off("mousemove");
        // turn on the mouse move listener that changes the image
        $(document).mousemove(changeImg);
        // add mouse click listener
        $(document).on('click', clickHandler);
      };
    };

    // turn on the vertical line mouse move listener
    $(document).mousemove(verticalLineInit);
  }
  // For randomizing order //
  function shuffle() {
    var a = [];
    var order = [];
    order = getRandomElement([1, 2]);
    return order;
  }

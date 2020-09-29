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

  function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]);
    return Face.fixationTime;
  }

  function getFaceSample (){  //get the sample of faces in each trial
    Face.singleFace = getRandomInt(1, 50);
    Face.image = ('img/'+ Face.personX +(Face.emotionX + Face.singleFace)+'.jpg')
    return Face.image;
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////                                                                                    //////////////////
//////////////////                            Order Study Specific Functions                          //////////////////
//////////////////                                                                                   //////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create an Array based on trial numbers that contains an equal amount of trial types (high first vs low first) so the trials can be balanced

function orderOfTrialsCreator (taskNumber_sequential){
  var orderOfTrials_sorted = [];
  for(i = 1; i <= (taskNumber_sequential/2); i++){
     temp = getRandomElement(["High_First","Low_First"]),
     orderOfTrials_sorted.push(temp)}
  return orderOfTrials_sorted;
}

function orderOfEmotionCreator (taskNumber_sequential){
  var orderOfEmotion = [];
  for(i = 1; i <= (taskNumber_sequential/2); i++){
    temp = getRandomElement([50, 100]),
    orderOfEmotion.push(temp)}
  return orderOfEmotion;
}

function orderOfPersonCreator (taskNumber_sequential){
  var orderOfPerson = [];
  for(i = 1; i <= (taskNumber_sequential/2); i++){
    temp = getRandomElement(["A", "B", "C", "D"]),
    orderOfPerson.push(temp)}
  return orderOfPerson;
}

function orderOfFacesCreator(taskNumber_sequential) {
  var orderOfFaces_sorted = [];
  temp = [];
  for(i = 1; i <= (taskNumber_sequential/2); i++){
    temp = getRandomElement([2,4,6,8,10,12]),
    orderOfFaces_sorted.push(temp)}
    var orderOfFaces_random = shuffle(orderOfFaces_sorted);
    return orderOfFaces_random;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

var isArray = Array.isArray || function(value) {
  return {}.toString.call(value) !== "[object Array]"
};

function shuffleMultipleArrays() {
  var arrLength = 0;
  var argsLength = arguments.length;
  var rnd, tmp;

  for (var index = 0; index < argsLength; index += 1) {
    if (!isArray(arguments[index])) {
      throw new TypeError("Argument is not an array.");
    }

    if (index === 0) {
      arrLength = arguments[0].length;
    }

    if (arrLength !== arguments[index].length) {
      throw new RangeError("Array lengths do not match.");
    }
  }

  while (arrLength) {
    rnd = Math.floor(Math.random() * arrLength);
    arrLength -= 1;
    for (argsIndex = 0; argsIndex < argsLength; argsIndex += 1) {
      tmp = arguments[argsIndex][arrLength];
      arguments[argsIndex][arrLength] = arguments[argsIndex][rnd];
      arguments[argsIndex][rnd] = tmp;
    }
  }
}

function sequenceCreator2 (orderOfTrials,orderOfFaces,orderOfPerson,orderOfEmotion){  //get the sample of faces in each trial
  var trialNumber = orderOfTrials.length;
  var listOfStimuli = [];
  var k = 0;
  for(z = 1; z <= trialNumber; z++){ // trial by trial creation of stimuli depending on Trial Type and Face numbers
    var temp_order = orderOfTrials.shift();
    var temp_faces = orderOfFaces.shift();
    var temp_person = orderOfPerson.shift();
    var temp_emotion = orderOfEmotion.shift();
    if (temp_order == "High_First") {
      var single_trial = [];
      for (i = 1; i <= (temp_faces/2); i++){
        single_stimuli = getSingleHighFace(temp_person,temp_emotion)
        single_trial.push(single_stimuli);
      }
      for (k = 1; k <= (temp_faces/2); k++){
        single_stimuli = getSingleLowFace(temp_person,temp_emotion)
        single_trial.push(single_stimuli);
      }
    } else {
      var single_trial = [];
      for (j = 1; j <= (temp_faces/2); j++){
        single_stimuli = getSingleLowFace(temp_person,temp_emotion)
        single_trial.push(single_stimuli);
      }
      for (h = 1; h <= (temp_faces/2); h++){
        single_stimuli = getSingleHighFace(temp_person,temp_emotion)
        single_trial.push(single_stimuli);
      }
    }
    listOfStimuli.push(single_trial)
  }
  return listOfStimuli;
}

function unpackArraysOfTrials (listOfStimuli){  //get the sample of faces in each trial
  var temp_faces = [];
  var completeTrials = [];
  Face.cloneOrderOfFaces = [];
  for (h = 0; h < listOfStimuli.length; h++){
    var temp_stimuli = [];
    temp_stimuli.push(listOfStimuli[h]) // gets first trial from element
    var a = temp_stimuli[0] //lists elements of this trial
    temp_faces = a.length // lists the number of faces in this trial
    completeTrials = completeTrials.concat(a)
    Face.cloneOrderOfFaces.push(temp_faces);
    Face.cloneOfCloneOrderOfFaces = [...Face.cloneOrderOfFaces];
  }
  return completeTrials;
}

function getSingleHighFace (temp_person,temp_emotion){  //get the sample of faces in each trial
  Face.singleFace = getRandomInt(26, 50);
  var valence = temp_emotion;
  var person_ID = temp_person;
  Face.image = ('img/'+ temp_person +(valence + Face.singleFace)+'.jpg')
  return Face.image;
}

function getSingleLowFace (temp_person,temp_emotion){  //get the sample of faces in each trial
  Face.singleFace = getRandomInt(1, 25);
  var valence = temp_emotion;
  var person_ID = temp_person;
  Face.image = ('img/'+ temp_person +(valence + Face.singleFace)+'.jpg')
  return Face.image;
}

function getTimeAndFace (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
  Face.fixationTime = getRandomElement([400, 500, 600]);

  //choose face_itive or negative valence before displaying faces
  Face.emotionX = getRandomElement([50, 100]); //randomly choose from negative and face_tive emotion
  //choose the identity of the face
  Face.personX = getRandomElement(['A','B','C','D']); //randomally choose from ['A','B','C','D'] -- select person

  return Face.fixationTime;
}

function getPractiseFaceSample (){  //get the sample of faces in each trial
  var valence = getRandomInt(1, 50);
  var image = ('img/'+ Face.personX +(valence + Face.emotionX)+'.jpg')
  return image;
}

function cloneAndReverseArrays (array){  //get the sample of faces in each trial
  var iterations = array.length;
  var reversed = [...array];
  for (j = 0; j < iterations; j++){
    var test = reversed[j];
    var clonetest = [...test];
    clonetest = clonetest.reverse();
    reversed.push(clonetest)
  }
  return reversed;
}

function cloneAndAddDublicate (array){  //get the sample of faces in each trial
  var clone = [...array];
  var dublicate = [...array];
  var full = clone.concat(dublicate);
  return full;
}

function cloneAndAddReverse (array){  //get the sample of faces in each trial
  var clone = [...array];
  var secondHalf = [];
  var iterations = array.length;
  for (j = 0; j < iterations; j++){
    var test = clone[j];
    if (test == "High_First") {
      var temp = "Low_First"
    } else {
      var temp = "High_First"
    }
    secondHalf.push(temp)
  }
  full = clone.concat(secondHalf)
  return full;
}

function trial_shifter (){  //get the sample of faces in each trial
  Face.fixationTime = getRandomElement([400, 500, 600]);
  Face.emotionX = Face.cloneOrderOfEmotions.shift();
  Face.personX = Face.cloneOrderOfPerson.shift();
  Face.trialX = Face.cloneOrderOfTrials.shift();
  Face.facesX = Face.cloneOfCloneOrderOfFaces.shift();
  return Face.fixationTime;
}

function stimulus_shifter (){  //get the sample of faces in each trial
  var currentValue = Face.completeSequences.shift();
  Face.Stimulus = currentValue;
  return currentValue;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////                                                                                    //////////////////
//////////////////                                      Morphscale Functions                          //////////////////
//////////////////                                                                                   //////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray
    var scale = [];
    for(i = 1; i < (50+1); i++){
       scale.push('img/'+Face.personX+(Face.emotionX +i) + '.jpg')
     }
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

/**
Functions in Sequential Task
**/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function loadFacePool() { // takes the list of gif names
  var files = [];
  return files;
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
    Face.image = getRandomElement(gif_stimuli)
    Face.gifDuration = Face.image;
    Face.gifDuration = Face.gifDuration.replace(/[^0-9,]/g, '');
    Face.gifDuration = Face.gifDuration.substr(0,4);

    Face.fixationTime = getRandomElement([400, 500, 600]);

    //choose face_itive or negative valence before displaying faces
    Face.emotionX = Face.image; //randomly choose from negative and face_tive emotion
    Face.emotionX = Face.emotionX.replace(/[^0-9,]/g, '');
    Face.emotionX = Face.emotionX.substr(6);
    if (Face.emotionX > 100) { //  this variable keeps information about whether trial was pos or neg
      Face.emotionX = 100
    } else {
      Face.emotionX = 50
    }

    //choose the identity of the face
    Face.personX = Face.image; //randomly choose from negative and face_tive emotion
    Face.personX = Face.personX.replace(/[^A-Z,]/g, '');
    Face.personX = Face.personX.substr(2);

    return Face.fixationTime;
  }

  function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]);
    return Face.fixationTime;
  }

  function gifDuration (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    duration = Face.gifDuration
    return duration;
  }

  function faceStimulus (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    image = Face.image
    return image;
  }

function gifRemover (){
  duration_of_gif = gifDuration()
  setTimeout(function(){ $('img').remove(); }, duration_of_gif);
}

function pageDuration(){
  duration_of_gif = gifDuration()
  duration_of_page = parseInt(duration_of_gif) + 1500
  return duration_of_page
}

  function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in faceArray
    var scale = [];
    for(i = 1; i < (50+1); i++){
       scale.push('img/'+Face.personX + (Face.emotionX +i) + '.jpg')}
    return scale;
  }

  function memoryFace(){ //Select face for memory task
    var correctFace = getRandomElement(Face.facePool); //selects a random picture of the ones that have been shown in the trial
    correctFace = correctFace.substr(4); // we need to remove the image/ directory prefix to get into another folder
    correctFace = ('img/' + correctFace);
    var wrongFace = ImageToNumber(Face.facePool); //Before we can get a false picture, we need to transform picture array into number array (which starts from lowest number)
    wrongFace = falseFace(wrongFace); // getting a false picture. That is located between the real pictures that had the biggest distance to each other.
    var leftPicture = []; //
    var rightPicture = [];
    order = shuffle();
    if (order == 1){
      leftPicture = correctFace;
      rightPicture = wrongFace;
    } else {
      leftPicture = wrongFace;
      rightPicture = correctFace;
    }
    var stimulus_iamages = "<div id='myDiv' style='height: 200px; width: 560px'>" + "<div style='float: left;'><img src=" + "'" + leftPicture + "'" +  "></img>" + "</div>" + "<div style='float: right;'><img src=" + "'" + rightPicture + "'" + "></img>" + "</div>"; //if you want to change the left pictures position go to jspsych css and change #myDiv to change right position picture change widht of first div
    return stimulus_iamages;
  }

  function memoryFace1(){ //Select face for memory task
    var correctFace = getRandomElement(Face.facePool); //selects a random picture of the ones that have been shown in the trial
    correctFace = correctFace.substr(4); // we need to remove the image/ directory prefix to get into another folder
    correctFace = ('img/' + correctFace);
    var wrongFace = ImageToNumber(Face.facePool); //Before we can get a false picture, we need to transform picture array into number array (which starts from lowest number)
    wrongFace = falseFace(wrongFace); // getting a false picture. That is located between the real pictures that had the biggest distance to each other.
    var leftPicture = []; //
    var rightPicture = [];
    order = shuffle();
    if (order == 1){
      leftPicture = correctFace;
      rightPicture = wrongFace;
    } else {
      leftPicture = wrongFace;
      rightPicture = correctFace;
    }
    var stimulus_iamages = "<p> Decide which of the target faces had the <strong> same expression </strong> as one in the sequence </p>" + "<div style='height: 200px; width: 700px'>" + "<div style='float: left;'><img src=" + "'" + leftPicture + "'" +  "></img>" + "</div>" + "<div style='float: right;'><img src=" + "'" + rightPicture + "'" + "></img>" + "</div>"; //if you want to change the left pictures position go to jspsych css and change #myDiv to change right position picture change widht of first div
    return stimulus_iamages;
  }


  function rectangle(){
    var rect = '<style> img { display: block; margin-left: auto; margin-right: auto; border: 3px solid red;} </style>'
    $(".jspsych-content").prepend(rect);
  }


  function ImageToNumber (facePool) { // This function transforms the image array into a number array that starts from the lowest number for further processing
    var imageToNumb = facePool;
    imageNumb = imageToNumb.toString().replace(/[^0-9,]/g, '');
    imageNumb = imageNumb.split(',');
    imageNumb = imageNumb.sort(function(a, b){return a-b});
    return imageNumb;
  }

  function falseFace(imageNumb){ //This function returnes a fasle picture that is in the middle of 2 real images that have the biggest distance between them.
    var imageDiff = diff(imageNumb); //this line returnes an array representing the distances between two real pictures
    var middle = Math.round(imageDiff/2); // variable that will be used to construct the false picture. This is the distance to the middle between two real pictures, where we want to create the wrong picture.
    var index = PicHighestIndex(imageNumb); // This function locates the position of the lower real face that has the highest distance to the next real face, which we will use to construct the wrong picture.
    var PictureBase = imageNumb[index]; // Selects the value of  of the lower real face. By adding the middle variable we will have the correct valence for the wrong picture
    var FalsePicture = ('img/' + Face.personX+ (+PictureBase + +middle)+'.jpg'); // creating the picture name with correct valence etc.
    return FalsePicture;
  }

  function diff(ary) { //This function returns the biggest difference between neighboors of right (presented in sequence) pictures
    var newA = []; // temp array
    for (var i = 1; i < ary.length; i++) // calculates the difference between the neighbours and returns this into the temp variable
        newA.push(ary[i] - ary[i - 1]);
    newA = Math.max.apply(null, newA) // selects the biggest difference value
    return newA;
}

function PicHighestIndex(ary) { //This function finds index of array that has the biggest distance to its neigbour
  var newB = []; // the first 2 lines are identical to the diff(), and return an array of difference scores
  for (var i = 1; i < ary.length; i++)
      newB.push(ary[i] - ary[i - 1]);
  var highestDiffIndex = indexOfMax(newB); // calls a function that finds the index biggest value in an arrays
  return highestDiffIndex;

}

function indexOfMax(arr) { //This function finds the index of the value in an array that has the higest value
    if (arr.length === 0) { // In case for some reason an array is 0, which shouldnt happen
        return -1;
    }


    var max = arr[0]; // starts by selecting the first element in an array
    var maxIndex = 0; // this variable will rememeber the index of the highest index

    for (var i = 1; i < arr.length; i++) { // loops through the array and checks if the current highest value and its index is smaller than its neigbhour. If so the index and its value shifts to the next element in the array.
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
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

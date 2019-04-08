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
    var list = [];
    for(i = start; i < (end+1); i++){
       list.push( 'img/A' + i + '.jpg'); list.push( 'img/B' + i + '.jpg');
       list.push( 'img/C' + i + '.jpg'); list.push( 'img/D' + i + '.jpg');}
    return list;
  }

  function createSlideList(start,end){
    var list = [];
    for (i = start; i < (end+1); i++){
       list.push( 'img/ins/Slide ' + i + '.png');}
    return list;
  }

  function check_consent (){
    if ($('#consent_checkbox').is(':checked')) {
      return true;
    }else {
      alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
      return false;
    } return false;
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

  function checkCitizen (){
    var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
    if(choice == 1){
      alert('As mentioned in the study description, this study is limited to Americian participants. Your session will be terminated and the window will be closed.');
      window.close();
      return true;
    } else { return false;}
  }

  function checkPhone (){
    var choice = jsPsych.data.getLastTrialData().select('button_pressed').values[0];
    if(choice == 0){
      alert('As mentioned in the study description, this study can only be done a computer and would not work on a smartphone. Your experiment will be terminated and the window will be closed.');
      window.close();
      return true;
    } else { return false;}
  }




















  function getTimeAndFace (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]); 
    
    //choose face_itive or negative valence before displaying faces
    Face.emotionX = getRandomElement([50, 100]); //randomly choose from negative and face_tive emotion
    //choose the identity of the face
    Face.personX = getRandomElement(['A','B','C','D']); //randomally choose from ['A','B','C','D'] -- select person

    return Face.fixationTime;
  }

  function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.4, 0.5 and 0.6s
    Face.fixationTime = getRandomElement([400, 500, 600]); 
    return Face.fixationTime;
  }

  function getFaceSample (){  //get the sample of faces in each trial
    Face.singleFace = getRandomInt(1, 50);
    return ('img/'+ Face.personX +(Face.emotionX + Face.singleFace)+'.jpg');
  }

  function getScale (){ //generate the rating scale depending on the person and valence randomly chosen in singleFace
    return ['img/'+
        Face.personX+(Face.emotionX + 3*0) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*1) + '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*2) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*3) + '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*4) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*5) + '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*6) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*7) + '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*8) + '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*9) + '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*10)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*11)+ '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*12)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*13)+ '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*14)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 3*15)+ '.jpg', 'img/'+
        Face.personX+(Face.emotionX + 3*16)+ '.jpg', 'img/'+Face.personX+(Face.emotionX + 1*50)+ '.jpg']
  }

  function getNextSlide () {  //use to shift instruction slides
    var currentSlide = slideList.shift();
    return currentSlide
  }

  function loadStimulus(type,start,end) { //the start and ending index of the images
    var list = [];
    for(i = start; i < (end+1); i++){
      if (type == 'practice'){
        list.push( 'stimuli/practice/' + '1_0' + ("0" + i).slice(-2) + '.png');
      } else if (Face.emotionX == 50){
      list.push( 'stimuli/positive/' + i + '.jpg');
      } else {list.push( 'stimuli/negative/' + '1_0' + ('0' + i).slice(-2) + '.png');}}
    return list;
  }

  function getStimList(min1,max1,min2,max2) {  //min1:first index of practice stim, min1:first index of task stim
    var stims = [];
    for(i = min2; i < (max2+1); i++){    //use loop to get a list of stimulus with sequential numbers in file names
        if (Face.emotionX == 50){
               stims.push( 'stimuli/positive/' + i + '.jpg');
        } else { stims.push( 'stimuli/negative/' + '1_0' + ("0" + i).slice(-2) + '.png')}};//add task stims
    var stims = jsPsych.randomization.shuffle(stims);

    for(i = min1; i < (max1+1); i++){    //use loop to get a list of stimulus with sequential numbers in file names
        stims.push( 'stimuli/practice/' + '1_0' + ("0" + i).slice(-2) + '.png')};//add practice stims
    return stims;  //attention please! in the list, 4 practice stimulus are AT TGE END (for convenience of shuffling and ordering)
  }

  function getStim (){
    Face.stim =  Face.stims.pop();
    return Face.stim //get last stim of the stim list
  }
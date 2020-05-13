/**
Instructions for Sequential Task
**/

var instruction_welcome_page = {
  type: 'html-button-response',
  choices: ['Continue'],
  stimulus:  "<p> Dear participant.</p>"+
   "<p> You are about to participate in a study that was designed to test the process in which people evaluate emotional expressions that are presented in a sequence.</p>"+
   "<p> You will go through two sessions in which you will be asked to do slightly different things. Before each session you will go through a short instruction session, a practice round to make sure you understand what you need to do and complete the actual task. </p>"+
   "<p> Please follow the instructions carefully. </p>"
};

var  instruction_thanks_page = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus: "<p> You've completed the task. </p>" +
   "<p>Thank you for your participation.</p>" +
   "<p> The next section is a short survey (up to 5 min).</p>"
};

var instruction_general = [];
instruction_general = instruction_general.concat(instruction_welcome_page, instruction_thanks_page);

var  instruction_seq1 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> The goal of this session is to examine whether people can <span style='color: red;'>estimate</span> the <span style='color: red;'>average emotional expression of face sequences.</span>   </p>"+
   "<p> In each trial, a series of faces expressing various degrees of emotions will appear on the screen. The face sequence may either be expressing positive or negative emotions. </p>"+
   "<img src = img/A75.jpg></img>"+
   "<p> The face sequence will be on the screen for a brief moment. In order to take all the ratings in, try to focus your attention on it as much as possible. </p>"
};

var  instruction_seq2 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus: "<p>Following the face sequence, you will be asked to move the mouse left of the line to begin the rating phase</p>",
  on_load: line

};

var  instruction_seq3 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> A face will then appear on the screen. When you move your mouse, the face will change from being neutral to expressing emotion </p>"+
   "<p> By adjusting your mouse, <strong> you are asked to estimate the </strong> <span style='color: red;'> average emotional response of the face sequence you just saw. </span></p>",
   on_load: remover
};

var  instruction_seq4 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Once you make the choice, the page will switch to the next trial. </p>"+
  "<p> YOUR ESTIMATION OF THE </p>"+
   "<p> <span style='color: red;'> AVERAGE EMOTIONAL RESPONSE </span></p>"+
   "<p> of the face sequence you just saw. </p>"
};

var  instruction_seq5 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Once you make the choice, the page will switch to the next trial. </p>"
};

var  instruction_seq6 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> At the next stage, you will conduct a short practice run to make sure that the task is clear. </p>"+
  "<p> Remember the goal is to ESTIMATE THE AVERAGE EMOTIONAL RESPONSE of the of the face sequence you just saw. </p>"
};

var  instruction_seq_MainTaskTransition = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Thank you for completing the practice stage. Remember the goal was to ESTIMATE THE <span style='color: red;'> AVERAGE EMOTIONAL RESPONSE of the face sequence you just saw. </span></p>"+
  "<p> In the following section you will complete the actual session, which consists of 15 trials. This part of the study should take 7 minutes, more or less. </p>" +
  "<p> Click <strong>Continue</strong> to begin the actual task. </p>"
};

var instruction_sequence = [];
instruction_sequence = instruction_sequence.concat(instruction_seq1, instruction_seq2, instruction_seq3, instruction_seq4, instruction_seq5, instruction_seq6);

var  instruction_mem1 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> You completed the first session! The goal of this session is to examine whether people can <span style='color: red;'> remember the emotional facial expressions </span> of a face in the sequence. </p>"+
   "<p> As in the previous session, a series of faces expressing various degrees of emotions will appear on the screen. The face sequence may either be expressing positive or negative emotions. </p>"+
   "<img src = img/A75Target.jpg></img>"+
   "<p> The face sequence will be on the screen for a brief moment. In order to take all the ratings in, try to focus your attention on it as much as possible. </p>",
};

var  instruction_mem2 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> After the sequence, a target face will be presented to you. We ask you to <strong> recall </strong>, if the the presented face was in the sequence that you just have seen.   </p>"+
   "<p> As in the previous session, a series of faces expressing various degrees of emotions will appear on the screen. The face sequence may either be expressing positive or negative emotions. </p>"+
   "<img src = img/A75Target.jpg></img>"+
   "<p> If you think that the target face <span style='color: red;'> DID </span> appear in the sequence press the button: <span style='color: red;'> IT WAS </span>  </p>" +
   "<p> If you think that the target face <span style='color: red;'> DID NOT </span> appear in the sequence you just saw press the button: <span style='color: red;'> IT WAS NOT</span> </p>",
};

var  instruction_mem3 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Remember, the goal here is to provide </p>"+
   "<p> YOUR JUDGEMENT WHETHER </p>"+
   "<p> <strong> THE PRESENTED PICTURE <span style='color: red;'> WAS </span> OR <span style='color: red;'> WAS NOT </span> </strong></p>" +
   "<p> one of the faces in the sequence you just saw. </p>",
};

var  instruction_mem4 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Once you make the choice, the page will switch to the next trial. </p>",
};

var  instruction_mem5 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> At the next stage, you will conduct a short practice run to make sure that the task is clear. </p>"+
  "<p> Remember the goal is to ESTIMATE THE AVERAGE EMOTIONAL RESPONSE of the of the face sequence you just saw. </p>"
};

var  instruction_mem_MainTaskTransition = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Thank you for completing the practice stage. Remember the goal here is to provide YOUR JUDGEMENT <span style='color: red;'> WHETHER THE PRESENTED PICTURE WAS OR WAS NOT </span> of the face sequence you just saw.</p>"+
  "<p> In the following section you will complete the actual session, which consists of 15 trials. This part of the study should take 7 minutes, more or less. </p>" +
  "<p> Click <strong>Continue</strong> to begin the actual task. </p>"
};

var instruction_memory = [];
instruction_memory = instruction_memory.concat(instruction_mem1, instruction_mem2, instruction_mem3, instruction_mem4, instruction_mem5);

function line () {
  var vertLine = `<div style="border-left:black;border-style:solid;margin-left:${lineSlice}px; height:${vHeight}px;width:0px;position:absolute;" id="vertLine"></div>`;
  var linePrompt = `<div id="linePrompt"><div style="font-size:50px;position:absolute;margin-left:${lineSlice*1.3}px;margin-top:${vHeight/2}px"></div><div style="position:absolute;margin-left:${lineSlice*1.2}px;margin-top:${vHeight/2}px;z-index:5;">Move mouse left of the line to begin</div></div>`;
  //var instrLine = '<div style="position: absolute; top: 100px; right: 10px; width: 1000px; text-align:right;"> Following the face sequence, you will be asked to move the mouse left of the line to begin the rating phase </div>';
  $(".jspsych-content-wrapper").prepend(vertLine);
  $(".jspsych-content-wrapper").prepend(linePrompt);
  //$(".jspsych-content-wrapper").prepend(instrLine);
};

function remover () {
  $("#vertLine").remove();
  $("#linePrompt").remove();
};




var vHeight = 960;
var lineSlice = 940 / 10;

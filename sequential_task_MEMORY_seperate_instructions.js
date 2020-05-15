/**
Instructions for Sequential Task
**/

var instruction_welcome_page = {
  type: 'html-button-response',
  choices: ['Continue'],
  stimulus:  "<p align='left'> Dear participant,</p>"+
   "<p align='left'> You are about to participate in a study that was designed to examine how people summarize multiple emotional responses. You will go through two sessions in which <strong> you will be asked to complete two slightly different tasks. </strong></p>"+
   "<p align='left'> Please carefully read the instructions before each session. </p>",
   on_load: textbox
};

var  instruction_thanks_page = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus: "<p> You've completed the task. </p>" +
   "<p>Thank you for your participation.</p>" +
   "<p> The next section is a short survey (up to 5 min).</p>",
   on_load: textbox
};

var instruction_general = [];
instruction_general = instruction_general.concat(instruction_welcome_page, instruction_thanks_page);

var  instruction_seq1 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p align='left'> The goal of this session is to examine whether people can <span style='color: red;'>estimate</span> the <span style='color: red;'>average emotional expression of face sequences.</span>   </p>"+
   "<p align='left'> In each trial, a series of faces expressing various degrees of emotions will appear on the screen. The face sequence may either be expressing positive or negative emotions. </p>"+
   "<img src = img/A75.jpg></img>"+
   "<p align='left'> The face sequence will be on the screen for a brief moment. In order to take all the ratings in, try to focus your attention on it as much as possible. </p>",
   on_load: textbox
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
  stimulus:  "<p align='left'> A face will then appear on the screen. When you move your mouse, the face will change from being neutral to expressing emotion </p>"+
   "<p p align='left'> By adjusting your mouse, <strong> you are asked to estimate the </strong> <span style='color: red;'> average emotional response of the face sequence you just saw. </span></p>" +
   "<img src = img/A75.jpg></img>",
   on_load: remover_textbox
};

var  instruction_seq4 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Once you make the choice, the page will switch to the next trial. </p>"+
  "<p> YOUR ESTIMATION OF THE <span style='color: red;'>AVERAGE EMOTIONAL RESPONSE </span> </p>"+
   "<p> of the face sequence you just saw. </p>"
};

var  instruction_seq5 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Once you make your choice, the page will switch to the next trial. </p>"
};

var  instruction_seq6 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> At the next stage, you will conduct a short practice run to make sure that the task is clear. </p>"+
  "<p> Remember the goal is to <span style='color: red;'> ESTIMATE THE AVERAGE EMOTIONAL RESPONSE </span> of the of the face sequence you just saw.</p>"
};

var  instruction_seq_MainTaskTransition = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p align='left'> Thank you for completing the practice stage. </p>"+
  "<p align='left'> Remember, the goal was to ESTIMATE THE <span style='color: red;'> AVERAGE EMOTIONAL RESPONSE of the face sequence you just saw. </span></p>"+
  "<p align='left'> In the following section you will complete the actual session, which consists of 15 trials. This part of the study should take 7 minutes, more or less. </p>" +
  "<p align='left'> Click <strong>Continue</strong> to begin the actual task. </p>",
  on_load: textbox
};

var instruction_sequence = [];
instruction_sequence = instruction_sequence.concat(instruction_seq1, instruction_seq2, instruction_seq3, instruction_seq4, instruction_seq5, instruction_seq6);

var  instruction_mem1 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> You completed the first session! </p>"+
   "<p> The next session will be slightly different so please read the next instructions carefully </p>",
};

var  instruction_mem2 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus: "<p align='left'> As in the previous session, a series of faces expressing various degrees of emotions will appear on the screen. The face sequence may either be expressing positive or negative emotions. </p>"+
   "<img src = img/A75.jpg></img>"+
   "<p align='left'> The goal of this session is to examine whether people can <span style='color: red;'> remember the emotional facial expressions </span> of a face in the sequence. </p>",
   on_load: textbox
};

var  instruction_mem3 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p align='left'> After the sequence of faces you observed, a target face will be presented to you. We ask you to <strong> recall </strong>, if the the presented face was in the sequence that you just have seen.   </p>"+
   "<img src = img/A75Target.jpg></img>"+
   "<p align='left'> If you think that the target face <span style='color: red;'> DID </span> appear in the sequence press the button: <span style='color: red;'> IT WAS </span>  </p>" +
   "<p align='left'> If you think that the target face <span style='color: red;'> DID NOT </span> appear in the sequence you just saw press the button: <span style='color: red;'> IT WAS NOT</span> </p>",
   on_load: textbox
};

var  instruction_mem4 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> Remember, the goal here is to provide YOUR JUDGEMENT WHETHER </p>"+
   "<p> <strong> THE PRESENTED TARGET FACE (presented in red square) </p>" +
   "<p> <span style='color: red;'> WAS </span> OR <span style='color: red;'> WAS NOT </span> </strong> one of the faces in the sequence you just saw. </p>" +
   "<p> Once you make the choice, the page will switch to the next trial. </p>",
};

var  instruction_mem5 = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p> At the next stage, you will conduct a short practice run to make sure that the task is clear. </p>"+
  "<p> Remember the goal here is to provide YOUR JUDGEMENT WHETHER THE PRESENTED PICTURE WAS OR WAS NOT of the of the face sequence you just saw </p>",
};

var  instruction_mem_MainTaskTransition = {
  type: "html-button-response",
  choices: ['Continue'],
  stimulus:  "<p align='left'> Thank you for completing the practice stage. </p>"+
  "<p align='left'> Remember the goal here is to provide YOUR JUDGEMENT <span style='color: red;'> WHETHER THE PRESENTED PICTURE WAS OR WAS NOT </span> of the face sequence you just saw.</p>"+
  "<p align='left'> In the following section you will complete the actual session, which consists of 15 trials. This part of the study should take 7 minutes, more or less. </p>" +
  "<p align='left'> Click <strong>Continue</strong> to begin the actual task. </p>",
  on_load: textbox
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

function remover_textbox () {
  $("#vertLine").remove();
  $("#linePrompt").remove();
  var textbox = '<style> p { display: block; margin-top: 1em; margin-bottom: 1em; margin-left: 400px; margin-right: 400px;} </style>';
  $(".jspsych-content").prepend(textbox);
};

function textbox(){
  var textbox = '<style> p { display: block; margin-top: 1em; margin-bottom: 1em; margin-left: 400px; margin-right: 400px;} </style>'
  $(".jspsych-content").prepend(textbox);
}




var vHeight = 960;
var lineSlice = 940 / 10;

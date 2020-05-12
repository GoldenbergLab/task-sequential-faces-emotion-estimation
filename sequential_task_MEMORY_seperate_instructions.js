/**
Instructions for Sequential Task
**/

var test = {
  type: 'survey-text',
  questions: [{prompt: "TTTTTTTTTTTTTTTTTTTTTTTTTTTESSST"}],
  preamble: function() {
    var curr_stim = imageTestDescription.shift()
    return '<img src='+curr_stim+'></img>';
  },
  on_finish: function(data){
    Face.description = JSON.parse(data.responses).Q0; } //save description
};

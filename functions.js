/**
Various useful functions
**/

// Stolen from the internet, shuffles array in place
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

// Permute array according to index sequence
function permute(a, indices) {
    var i;
    var res = [];
    for (i = 0; i < indices.length; i ++) {
        res[i] = a[indices[i]];
    }
    return res;
}

// Create an integer sequence from 0 to n-1
function range(n) {
    var res = [];
    for (i = 0; i < n; i ++) {
        res[i] = i;
    }
    return res;
}

// chooses a random element from an array
function choice(a) {
    return a[Math.floor(Math.random() * a.length)];
}

//data/server communication
function saveData(filename, filedata, callback, error_callback){
   $.ajax({
      type: 'post',
      cache: false,
      url: 'https://web.stanford.edu/~amitgold/cgi-bin/save_data.php',
      data: {filename: filename, filedata: filedata},
      success: callback,
      error: error_callback
   });
}

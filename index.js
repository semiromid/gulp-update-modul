'use strict';
var Stream = require('stream'),
    exec = require('child_process').exec,
    obj,
    countpackege,
    losk_version,
    lengmass,
    keys;
const colors = require('colors');


module.exports = function (latest) {
    var readable = new Stream.Transform({ objectMode: true });
    readable._transform = function (file, unused, callback) {
        exec_command0(latest);
        //....
        //
        // Will be updated
        //
        //....
       return readable;
    }
    return readable;
}




//M-1-1 ==================================================================
function exec_command0(losk_version) {
    console.log(colors.cyan('Check update package...'));
    exec('npm outdated -json --long',
    (error, stdout, stderr) => {
        countpackege = 0;
        lengmass = 0;
        var massfordelete = new Array();
        massfordelete.fill(0);


        if (error !== null) {
            console.log(`exec error 1 : ${error}`);
        } else {
            if (stdout != "") {
                obj = JSON.parse(stdout);
                keys = Object.keys(obj);
                // [LATEST]
                //l------------------------------------------------------------------
                if (losk_version == 'latest') {
                    for (var i = 0 ; keys.length > i ; i++) {
                        //filter
                        //f----------------------------------------------------------
                        if (obj[keys[i]].latest > obj[keys[i]].current && obj[keys[i]].wanted <= obj[keys[i]].latest) {
                            countpackege = countpackege + 1;
                        }
                        if (obj[keys[i]].current == obj[keys[i]].latest && obj[keys[i]].wanted <= obj[keys[i]].latest) {
                            massfordelete[i] = keys[i];
                        }
                        if (obj[keys[i]].wanted > obj[keys[i]].latest) {
                            massfordelete[i] = keys[i];
                        }
                        //f----------------------------------------------------------

                        //start
                        //s----------------------------------------------------------
                        if (i == keys.length - 1 && countpackege != 0) {
                            for (var i2 = 0 ; massfordelete.length > i2 ; i2++) {
                                delete obj[massfordelete[i2]];
                            }
                            keys = Object.keys(obj);
                            exec_command1();
                        } else if (i == keys.length - 1 && countpackege == 0) {
                            for (var i3 = 0 ; massfordelete.length > i3 ; i3++) {
                                delete obj[massfordelete[i3]];
                            }
                            console.log(colors.cyan('Completed!'));
                        }
                        //s----------------------------------------------------------
                    }
                }
                //l------------------------------------------------------------------


                // [WANTED]
                //w------------------------------------------------------------------
                if (losk_version == 'wanted') {
                    if (obj[keys[i]].wanted > obj[keys[i]].current) {
                        xec_command1_wanted();
                        //....
                        //
                        // Will be updated
                        //
                        //....
                    }
                }
                //w------------------------------------------------------------------
            } else {
                console.log(colors.cyan('Completed!'));
            }
        }
    });
}
//================================================================================




///////////////////////////////////////////////////////////////
//npm update latest
///////////////////////////////////////////////////////////////
//M-2-1 ===========================================================================
function exec_command1() {
    exec('npm outdated --long',
    (error, stdout, stderr) => {
        if (error !== null) {
            console.log(`exec error 1 : ${error}`);
        } else {
            if (stdout != "") {
                console.log(colors.red('________________________________________________'));
                console.log(stdout);
                console.log(colors.red('________________________________________________'));
                console.log(colors.red('Update packege:  ') + "[" + countpackege + "]");
                setTimeout(wil, 5000, obj, keys, keys.length - 1);
            }
        }
    });
}

var wil = function datamodules(obj, keys, i) {
    lengmass = i;
    var modulUp = keys[lengmass];

    if (obj[keys[lengmass]].type == 'devDependencies') {
        var pos = lengmass + 1;
        console.log(colors.green('Update ') + colors.green("position: ") + "[" + pos + "]");
        exec_command_save_dev(modulUp);
    } else if (obj[keys[lengmass]].type == 'dependencies') {
        var pos = lengmass + 1;
        console.log(colors.green('Update ') + colors.green("position: ") + "[" + pos + "]");
        exec_command_save(modulUp);
    }
}
//=================================================================================


//M-3-1 ===========================================================================
function exec_command_save_dev(modulupdate) {
    console.log(colors.grey('Upgrade ' + "\'" + modulupdate + "\'" + '. Please wait...'));
    progress(true);
    exec('npm install ' + modulupdate +'@latest'+ ' --save-dev',
    (error, stdout, stderr) => {

        if (error !== null) {
            progress(false);
            console.log(`exec error: ${error}`);
        } else {

            progress(false);
            sleep(2000);
            console.log(`${stdout}`);
            console.log(colors.magenta('Finish:') + " \'" + colors.green(modulupdate)+"\'");
            console.log(colors.red('________________________________________________'));

            if (lengmass != 0) {
                lengmass = lengmass - 1;
                setTimeout(wil, 3000, obj, keys, lengmass);
            } else {
                console.log(colors.cyan('Completed!'));
            }
        }
    });
}

function exec_command_save(modulupdate) {
    console.log(colors.grey('Upgrade ' + "\'" + modulupdate + "\'" + '. Please wait...'));
    progress(true);
    exec('npm install ' + modulupdate + '@latest' + ' --save',
    (error, stdout, stderr) => {

        if (error !== null) {
            progress(false);
            console.log(`exec error: ${error}`);
        } else {

            progress(false);
            sleep(2000);
            console.log(`${stdout}`);
            console.log(colors.magenta('Finish:') + " \'" + colors.green(modulupdate)+"\'");
            console.log(colors.red('________________________________________________'));
            if (lengmass > 0) {
                lengmass = lengmass - 1;
                setTimeout(wil, 3000, obj, keys, lengmass);
            } else {
                console.log(colors.cyan('Completed!'));
            }
        }
    });
}
//=================================================================================






///////////////////////////////////////////////////////////////
//npm update wanted
///////////////////////////////////////////////////////////////
//M - 1 - 2 ========================================================================

function exec_command1_wanted() {

    console.log(colors.red('Version \'wanted\' yet not work, use \'latest\' version.'));
    //....
    //
    // Will be updated
    //
    //....
}


///////////////////////////////////////////////////////////////
//Other
///////////////////////////////////////////////////////////////
//M - 1 - 1 - 1 ======================================================================
var timerId;
function progress(lock) {
    if (lock) {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        timerId = setInterval(function () { process.stdout.write("\r" + P[x++]); x &= 3; }, 250);
    } else {
        clearInterval(timerId);
        process.stdout.clearLine();
    }
}

function sleep(ms) {
    var unixtime_ms = new Date().getTime();
    while (new Date().getTime() < unixtime_ms + ms) { }
}





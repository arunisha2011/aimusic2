song_1="";
song_2="";
song_1_status="";
song_2_status="";
score_left_wrist=0;
score_right_wrist=0;
leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;

function preload(){
    song_1=loadSound("Shake.mp3");
    song_2=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video= createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelloaded);
poseNet.on(poseNet,gotPoses);
}
function modelloaded(){
console.log('PoseNet Is Initionlized');
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    leftWristY=results[0].pose.leftWrist.x;
    leftWristX=results[0].pose.leftWrist.y;
    console.log("leftWristX =" + leftWristX + "leftWristY" + leftWristY);
    rightWristY=results[0].pose.rightWrist.x;
    rightWristX=results[0].pose.rightWrist.y;
    console.log("rightWristX =" + rightWristX + "rightWristY" + rightWristY);
    score_left_wrist=results[0].pose.keypoints[9].score;
    score_right_wrist=results[0].pose.keypoints[10].score;
} 
}
function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");
    song_1_status=song_1.isPlaying();
    song_2_status=song_2.isPlaying();

    if(score_left_wrist>0.2){
        circle(leftWristX,leftWristY,20);
        song_1.stop();
        if(song_2_status==false){
            song_2.play();
            document.getElementById("name").innerHTML="Playing Harry Potter Theme Song";
        }
    }
    if(score_right_wrist>0.2){
        circle(rightWristX,rightWristY,20);
        song_2.stop();
        if(song_1_status==false){
            song_1.play();
            document.getElementById("name").innerHTML="Playing Shake it off";
        }
    }
}
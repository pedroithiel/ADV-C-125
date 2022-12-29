noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;
var eyeleftX = 0;
var eyeleftY = 0;
var eyerightX = 0;
var eyerightY = 0;
function setup() {
    canvas = createCanvas(700, 700)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(500, 500)
}

function draw() {
    background("#646566");

    fill("#F90093");
    stroke("#F90093");
    square(noseX, noseY, difference);
    circle(eyeleftX, eyeleftY, 50)
    circle(eyerightX, eyerightY, 50)

    //console.log("noseX: " + noseX);
    //console.log("noseY: " + noseY);
    //console.log("difference: " + difference);

    poseNet = ml5.poseNet(video, modeload)
    poseNet.on("pose", gotPose)
    document.getElementById("largurEAltura").innerHTML = "largura e altura serão " + difference + "px";
}
function modeload() {
    console.log("model load")
}

function gotPose(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        eyeleftX = results[0].pose.leftEye.x;
        eyeleftY = results[0].pose.leftEye.y;
        eyerightX = results[0].pose.rightEye.x;
        eyerightY = results[0].pose.rightEye.y;
    } else {
        console.log("algo deu erro");
        //alert("ocorreu um error, você pode ter saido da visão da webCam")
    }
}
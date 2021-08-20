nose_x = 0;
nose_y = 0;
difference = 0;
rightWrist_x = 0;
leftWrist_x = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(500, 350);
    video.position(125, 400)

    canvas = createCanvas(500, 350);
    canvas.position(700, 400)

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("Posenet ModelLoaded")
}

function gotPoses(results) {
    if (results.length > 0)
    //Thus,array is not blank....
    {
        console.log(results);
        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;

        rightWrist_x = results[0].pose.rightWrist.x;
        leftWrist_x = results[0].pose.leftWrist.x;
        difference = floor(leftWrist_x - rightWrist_x);

    }
}

function draw() {
    incolor = document.getElementById("incolor").value;
    if (incolor == "") {
        incolor = "black"
    }
    bcolor = document.getElementById("bcolor").value;
    if (bcolor == "") {
        bcolor = "white"
    }

    background("#4c0082");
    fill(incolor);
    strokeWeight(5);
    stroke(bcolor);
    document.getElementById("size").innerHTML = difference + "px"
    square(nose_x, nose_y, difference)
}
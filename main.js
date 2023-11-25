function preload() {
    classifier= ml5.imageClassifier("DoodleNet")
}

function setup() {
    canvas= createCanvas(300, 300)
    canvas.center()
    background("#e2d7fd")
    canvas.mouseReleased(classifyCanvas)
    synth= window.speechSynthesis
}

function draw() {
    strokeWeight(10)
    stroke("black")

    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
}

function clearCanvas() {
    background("#e2d7fd")
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.error(error)
    }

    else {
        console.log(result)
        document.getElementById("label1").innerHTML= "Image Identified: " + result[0].label
        document.getElementById("label2").innerHTML= "Confidence: " + Math.floor(result[0].confidence*100) + "%"
        utterThis= new SpeechSynthesisUtterance(result[0].label)
        synth.speak(utterThis)
    }
}

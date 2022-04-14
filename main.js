img="";
status="";
objects= [];



function setup()
{
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.hide();
objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="status= Detecting objects";
} 


function modelLoaded()
{
console.log("modelLoaded");
status=true;
 
}

function gotResults(error, results)
{
    if(error){
        console.error(error);

    }
    console.log(results);
    objects= results;
}



function draw()
{
image(video, 0,0, 380,380);
if(status !="")
{
    r= random(255);
    g= random(255);
    b =random(255);
    objectDetector.detect(video, gotResults);
    for(var i=0;i<objects.length;i++)
    {
        document.getElementById("status").innerHTML="status= object detected";
        document.getElementById("numberofobjects").innerhtml="number of objacts are- "+objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+ " "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);

    }
}







}


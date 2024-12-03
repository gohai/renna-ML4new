let uploadedImage;
let userInput = ""
let openai_api_proxy = "https://zest-quiet-phalange.glitch.me/";
let message;
let commentArray = [];

function setup() {
  // let canvas = createCanvas(400, 400);
  // canvas.parent("#post");
  // background(0);
  // fill(255);
  select("#submit-btn").mouseClicked(submittedAction);
  select("#file-input").elt.addEventListener('change', handleFileSelect);
  

}
function handleFileSelect(event) {
  let file = event.target.files[0];
  if (file && file.type.startsWith('image')) {
    // Load the selected image into p5.js
    //uploadedImage = loadImage(URL.createObjectURL(file));

    // GH: we don't need to load the image for use in P5,
    // as we aren't using the canvas - instead we can
    // simply set the "src" of an <img> element like so
    let objectUrl = URL.createObjectURL(file);
    select("#file-img").elt.src = objectUrl;
    select("#comment-post-img").elt.src = objectUrl;
  }
}

function sendMessage() {
  let content = select("#input-text").value();
  // if (content == "") {
  //   return;
  // }
  userInput = content;
  if (uploadedImage) {
    let file=select("#file-input");
  }
  
  
  messages = [{
    role: "user",
    content: "I'm doing a project to let user upload text and one image like what they will do on social media,and let you to give comment on it like real people do. now I need a list of 20 userIDs and comments. comments can be  humorous or serious and positive or negative. the ID can have or without numbers.Respond as valid JSON without any prefix. Use the properties \"id\" and \"comment\" for each comment. Here are the user's blog: "+ select("#file-input").value() + select("#input-text").value(),
  }];
  
  select("#input-text").value("");
  
  let params = {
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);

  
}

function gotResults(results) {
  // console.log(results);

  let message = results.choices[0].message.content;
  console.log(message);
  
  pushInputToArray(message);
  console.log(commentArray)
}

 function draw() {
  
//  background(0);
//   textSize(16);
//   fill(255);
//   textAlign(LEFT, TOP);
//   text(userInput, 10, 10, width - 20, height - 20);
//   if (uploadedImage) {
//     image(uploadedImage, 10, 50, uploadedImage.width / 2, uploadedImage.height / 2);
//   }
 }

function pushInputToArray(input) {
  let commentsArray = [];
  try {
    input = input.replace('```json', '');
    input = input.replace('```', '');
    input = input.trim();
    commentsArray = JSON.parse(input);
    console.log(commentsArray);
  } catch (e) {
    console.log('Got invalid JSON back from GPT');
    return;
  }
  updateComments(commentsArray);
  if (commentsArray.length > 0) {
    displayAction();
}
}

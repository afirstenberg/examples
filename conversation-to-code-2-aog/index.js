// Import the Dialogflow service function
const {dialogflow} = require('actions-on-google');

const action = dialogflow();

action.intent('welcome', conv => {
  let replyState = setReplyState( conv, 'prompt' );
  let intent = getIntentName( conv );
  sendReply( conv, intent, replyState );
});

action.intent('letter', conv => {
  let replyState = setReplyState( conv, 'letter' );
  let intent = getIntentName( conv );
  sendReply( conv, intent, replyState );
});

action.intent('number', conv => {
  let replyState = setReplyState( conv, 'number' );
  let intent = getIntentName( conv );
  sendReply( conv, intent, replyState );
});

action.intent('yes', conv => {
  let replyState = getReplyState( conv );
  let intent = getIntentName( conv );
  sendReply( conv, intent, replyState );
});

action.intent('no', conv => {
  let replyState = setReplyState( conv, 'prompt' );
  let intent = getIntentName( conv );
  sendReply( conv, intent, replyState );
});

function getReplyState( conv ){
  return conv.data['replyState'];
}

function setReplyState( conv, state ){
  conv.data['replyState'] = state;
  return state;
}

function getIntentName( conv ){
  return conv.intent;
}

const welcomeReplies = [
  "Welcome! Would you like to hear a letter or number?",
  "Ahoy! Would you like to hear a number or letter?"
];

const promptReplies = [
  "Ok. Would you like to hear a letter or number?",
  "Gotcha. Would you like to hear a number or letter?"
];

const letterReplies = [
  "The letters A and I are also words. Shall I tell you another?",
  "The letter W is called a double V in French. Game for another?"
];

const numberReplies = [
  "42 is the answer. Interested in another?",
  "21 is blackjack. Would you like to hear another?"
];

const allReplies = {
  welcome: welcomeReplies,
  prompt:  promptReplies,
  letter:  letterReplies,
  number:  numberReplies
};

function sendReply( conv, intent, replyState ){

  // Replies are usually based on the reply state,
  // unless this is the welcome intent.
  let repliesNamed = replyState;
  if (intent === 'welcome' && replyState === 'prompt'){
    repliesNamed = 'welcome';
  }

  // Get the replies associated with this name
  let replies = allReplies[repliesNamed];

  // Pick one of them randomly
  let pick = Math.floor( Math.random() * replies.length );
  let reply = replies[pick];

  // Send it
  conv.add( reply );
}

const functions = require('firebase-functions');
exports.webhook = functions.https.onRequest(action);


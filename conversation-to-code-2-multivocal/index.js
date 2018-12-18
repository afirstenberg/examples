
const Multivocal = require('multivocal');

const undResponsePrompt = [
  {
    Base: {Set:true},
    Criteria: "{{is IntentName 'welcome'}}"
  },
  "Welcome!",
  "Ahoy!",

  {
    Base: {Set:true},
    Criteria: "{{isnt IntentName 'welcome'}}"
  },
  "Ok.",
  "Gotcha."
];

const undResponseLetter = [
  "The letters A and I are also words.",
  "The letter W is called a double V in French."
];

const undResponseNumber = [
  "42 is the answer.",
  "21 is blackjack."
];

const undSuffixLetterNumber = [
  "Shall I tell you another?",
  "Game for another?",
  "Interested in another?",
  "Would you like to hear another?"
];

const undSuffixPrompt = [
  "Would you like to hear a letter or number?",
  "Would you like to hear a number or letter?"
];

const config = {
  Local: {
    und: {
      Response: {
        "Outent.letter":  undResponseLetter,
        "Outent.number":  undResponseNumber,
        "Outent.prompt":  undResponsePrompt
      },
      Suffix: {
        "Outent.letter":  undSuffixLetterNumber,
        "Outent.number":  undSuffixLetterNumber,
        "Outent.prompt":  undSuffixPrompt
      }
    }
  }
};

function stateDefault( env ){
  env.Outent = `Outent.${env.Session.State.replyState}`;
  return Multivocal.handleDefault( env );
}

Multivocal.addIntentHandler('welcome', env => {
  env.Session.State.replyState = 'prompt';
  return stateDefault( env );
});

Multivocal.addIntentHandler('letter', env => {
  env.Session.State.replyState = 'letter';
  return stateDefault( env );
});

Multivocal.addIntentHandler('number', env => {
  env.Session.State.replyState = 'number';
  return stateDefault( env );
});

Multivocal.addIntentHandler('yes', env => stateDefault(env));

Multivocal.addIntentHandler('no', env => {
  env.Session.State.replyState = 'prompt';
  return stateDefault( env );
});

new Multivocal.Config.Simple(config);
exports.webhook = Multivocal.processFirebaseWebhook;

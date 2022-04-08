// AJLS-kahoot 
// extra steps: help page for kahoot(steps to start game)
// 1. login person can select a quiz and start game and becomes host, and goes to lobby page(join-game component)
// 1. a. check if game started, then only accept the username in lobby, else show message, "game has not started"
// host connects ///  list of players and one has to be host()
// host selects quiz // Quiz, page for selecting quiz
// others join // keep track of the players sockets
// everyone add names // every time someone adds a name everyone receives names /// players names
// host starts game // which phase - lobby, question, leaderboard
// everyone routes to next route // to send which page everyone should be on
// all players are giving first question / send first question
// all players answer question/ / players answers for each game/ when everyone is done.
// all players route to leader board and are giving results - when everyone answers route each player to leader board
// host request next question / all players route to next question
// repeat line 11 to 14 until all questions are answered. /// know when it is done
// const game = {
//     phaseIndex: 0,
//     phases: ['select quiz', 'lobby', 'question', 'leader board'],
//     players: [
//         {name: 'Larry', host: true, socketId: '789579579', points: 100, done: true, answer: a }
//     ],
//     quiz: {
//         name: 'Angular',
//         questions: [ {
//             completed: true,
//             text: 'what is a component',
//             answers: [
//                 {text: true, correct: false},
//                 {text: false, correct: false},
//                 {text: 'all the above', correct: false}]
//         }],
//     }
// }
// game.js(algorithm steps,)
// Player model(playerName: string, host: boolean, socketId: string, point: number, done: boolean, answer: string)
// Game model(phases: array, players: array, quiz: Quiz)

const game = {
    phases: ['select quiz', 'lobby', 'question', 'leader board'],
    players: [],
    quiz: null,
}
setTimeout(() => {
    console.log('first person connects');
    const socketId = 1;
    addPlayer({socketId, host: true});
    if (game.players.length === 1) {
        console.log('socket.emit', 'select-quiz')
    }
    console.log(game);
}, );
setTimeout(() => {
    console.log('second person connects');
    const socketId = 2;
    addPlayer({socketId});
    console.log('socket.emit', 'lobby')
    console.log(game)
}, 2000);
setTimeout(() => {
    console.log('third person connects');
    const socketId = 3;
    addPlayer({socketId});
    console.log('socket.emit', 'lobby')
    console.log(game)
}, 5000);
setTimeout(() => {
    console.log('third person adds name');
    const socketId = 3
    addName('Joe', socketId);
    console.log('io.emit', 'player added name', game.players)
    console.log(game)
}, 7000);
setTimeout(() => {
    console.log('second person adds name');
    const socketId = 3
    addName('Moe', socketId);
    console.log('io.emit', 'player added name', game.players)
    console.log(game)
}, 10000);
setTimeout(() => {
    console.log('first person adds name');
    const socketId = 1
    addName('Mike', socketId);
    console.log('io.emit', 'player added name', game.players)
    console.log(game)
}, 10000);
setTimeout(() => {
    console.log('first person adds quiz');
    const socketId = 1
    selectQuiz(  {
        name: 'Angular',
        questions: [ {
            text: 'what is a component',
            answers: [
                {text: true, correct: false},
                {text: false, correct: false},
                {text: 'all the above', correct: true}]
        }, {
            text: 'what is a route',
            answers: [
                {text: true, correct: false},
                {text: false, correct: false},
                {text: 'all the above', correct: true}]
        }],
    });
    console.log('socket.emit', 'lobby')
    console.log(game)
}, 13000);
setTimeout(() => {
    console.log('first person starts game');
    console.log('io.emit', 'question', getQuestion())
    console.log(game)
}, 16000);
setTimeout(() => {
    console.log('first person answers question');
    answerQuestion(1, 'all the above');
    console.log(game)
}, 19000);
setTimeout(() => {
    console.log('second person answers question');
    answerQuestion(2, 'all the above');
    console.log(game)
}, 19000);
setTimeout(() => {
    console.log('third person answers question');
    answerQuestion(3, true);
    console.log(game)
}, 24000);
setTimeout(() => {
    console.log('host okays leader board');
    console.log('io.emit', 'question', getQuestion())
    console.log(game)
}, 27000);
function addPlayer(player){
    player.points = 0;
    game.players.push(player)
}
function addName(name, socketId) {
    findBySocket(socketId).name = name;
}
function findBySocket(socketId) {
    return game.players.find(player => player.socketId === socketId)
}
function findCorrect(questions) {
    return questions.find(question => question.correct)
}
function makeHost(player) {
    player.host = true;
}
function selectQuiz(quiz) {
    game.quiz = quiz;
}
function getPhase(){
   return game.phases[game.phaseIndex];
}
function goToNextPhase() {
    game.phaseIndex++;
    return getPhase();
}
function getQuestion() {
   return game.quiz.questions.find(question => !question.completed);
}
function answerQuestion(socketId, answer) {
    findBySocket(socketId).answer = answer;
    if (hasEveryoneAnswered()) {
        game.players.forEach(player => {
            console.log(getQuestion());
            console.log(findCorrect(getQuestion().answers))
            const correct = player.answer === findCorrect(getQuestion().answers).text;
            if (!player.points) {
                player.points = 0;
            }
            if (correct) {
                player.points += 1;
            }
            player.answer = null;
        });
        getQuestion().completed = true;
        console.log('socket.emit', 'leader board')
    }
}
function hasEveryoneAnswered() {
    return game.players.every(player => player.answer)
}
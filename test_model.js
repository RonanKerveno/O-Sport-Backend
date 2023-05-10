// on récupère les modèles depuis index.js 

const { Question, Level, Quiz, User, Tag, Answer} = require('./app/models/V4')



async function test() {
    const users = await Users.findAll({
        order: [['created_at', 'DESC']], // on trie par date de création
        include: { // là on parle des associations, on explique ce qu'on veut inclure dans notre requête : 
            association: "sports"
        }
    })
    console.log(users);
}

async function test2() {
    const result = await Question.findAll({
        include: ["level"]
    })
    console.log(result);
    console.log(result[0].level.name)
}


async function testTagQuiz() {
    try {
    const result = await Quiz.findAll({
        include: ["tags"]

    })
    console.log(result);
    console.log(result[4].tags[0].name)

    }
    catch(e) {
        console.log(e);
    }
}

async function testQuizQuestion() {
    try {
        const result = await Quiz.findAll({
            include: ['questions']
        }) 
        console.log(result);
    }catch(e) {
        console.log(e);
    }
}

async function testQuizAnswer() {
    try {
        const result = await Question.findAll({
            include: ['answers', 'goodAnswer', 'level', 'quiz']
        })
        //console.log(result);
        console.log(result[0])
    }catch(error) {
        console.log(error);
    }
}

test();


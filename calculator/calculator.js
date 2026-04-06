
function load() {
    buttons = Array.from(document.getElementsByClassName("click"))
    for (const button of buttons) {
        console.log("PLaying...")
        button.addEventListener("click", playClickSound) // event type, function
    }
}
function playClickSound() {
    var audio = new Audio("./click.wav")
    audio.play();
}

// "sleep async function ripped off from stackoverflow)
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function explode(){
    const cat = document.getElementById("cat")
    cat.src = cat.src // reassign to start from top
    cat.hidden = false
    await sleep(1400)
    cat.hidden = true;
}


function resetScreen(){
    document.getElementById("screen").textContent = "0"
    stack = []
    the_string = ""
}

function pushItem(something){
    let screen = document.getElementById("screen")
    let content = screen.textContent; // grab content in screen object, put in variable to ref easily
    the_string += something

    

    if (content ==="0" || content ==="Error" || calculated === 1 ) {
        calculated = 0
        screen.textContent = something;
    } 
    
    else{
        screen.textContent = content + something
    }

}



var stack = []
// stack.push() stack.pop()
var the_string = ""
const precedence = {
    "+": 1, "-":1, "*":2, "/":2
}
var calculated = 0
// caluclate psudo
// get input
// convert infix to postfix using stack
// another stack for postfix 

function calculate(){
    screen = document.getElementById('screen')
    var answer = ""
    const expArray = the_string.trim().split(' ').filter( token => token !== '') // filter out nothing tokens
    var  postfix = []
    for (let thing of  expArray) {
        if (thing in precedence === false){
            postfix.push(thing)
        }
        else{
            // stack not empty and higher precedence then add that sign to the postfix string 
            while (stack.length != 0  && precedence[stack[stack.length-1]] > precedence[thing])
            {   
                var popped = stack.pop() // take the higher precedence if have and put in postfix stack 
                postfix.push(popped)
            }

            stack.push(thing) // push current operator back into stack
        }
    }

    // put remaining stuff in stack into postfix
    while (stack.length !=0) {
        postfix.push(stack.pop())
    }

    console.log(postfix)
    var postfixStack = []
    for (let i =0; i < postfix.length; i++){
        var error = 0
        switch (postfix[i]){

            case "+":
                postfixStack.push(postfixStack.pop() + postfixStack.pop())
                break;
            case "-":
                b = postfixStack.pop() // the one nearest to the top
                a = postfixStack.pop()
                postfixStack.push(a-b )
                break;
                
            case "*":
                postfixStack.push((postfixStack.pop() * postfixStack.pop()).toFixed(3))
                break;

            case "/":
                a = postfixStack.pop()
                b = postfixStack.pop()
                if (b === 0) {
                    error = 1
                    break;
                }
                postfixStack.push((b/a).toFixed(3))
                break;
            
            default:
                postfixStack.push(parseFloat(postfix[i].trim()))
        }
        if (error != 0 ){
            break
        }

    }
    console.log(`postfixStack ${postfixStack}`)
    if (postfixStack.length > 1){
        answer = "Error"
    }
    else{
        answer = postfixStack.pop()
        if (isNaN(answer)){
        answer = "0"
    }

    }

    

    screen.textContent = answer
    stack =[]
    postfixStack = []
    the_string=""
    calculated = 1
    

}

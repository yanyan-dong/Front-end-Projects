const correctAnswers = ['D','A','B','D','C','D','A','D','B','C'];
const form = document.querySelector('.quiz-form');
const result = document.querySelector('.result');

form.addEventListener('submit', e => {
    e.preventDefault();

    let score = 0;
    const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value, form.q5.value, form.q6.value, form.q7.value, form.q8.value, form.q9.value, form.q10.value];

    // check answers
    userAnswers.forEach((answer, index) => {
        if(answer === correctAnswers[index]){
            score += 10;
        }
    }); 

    // show result on page
    scrollTo(0,0); // scroll up to the top of the screen
    
    result.classList.remove('d-none'); // display

    let output = 0;
    const timer = setInterval(() => { //setInterval
        result.querySelector('span').textContent = `${output}%`;
        if(output === score){
            clearInterval(timer); //stop
        } else {
            output++; // +1
        }
    }, 15); // Time interval


});
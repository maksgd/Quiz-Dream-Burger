document.addEventListener('DOMContentLoaded', function () { // Сначала прогрузить весь сайт, а потом подгрузить JS.
    const btnOpenModal = document.querySelector('#btnOpenModal')
    const modalBlock = document.querySelector('#modalBlock')
    const closeModal = document.querySelector('#closeModal')
    const questionTitle = document.querySelector('#question')
    const formAnswers = document.querySelector('#formAnswers')

    const burgerName = document.querySelector('#standartName').innerHTML
    const srcImgW = document.querySelector('#srcImgW').attributes.src.nodeValue


    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block')
        playTest()
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block')
    })

    const playTest = () => {
        const renderQuestions = () => {
            questionTitle.textContent = 'Какого цвета бургер вы хотите?'

            formAnswers.innerHTML = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${srcImgW}" alt="burger">
                <span id="standartName">${burgerName}</span>
                </label>
            </div>
            `
            console.log('OK')
        }

        renderQuestions()
    }
})





document.addEventListener('DOMContentLoaded', function () { // Сначала прогрузить весь сайт, а потом подгрузить JS.
    const btnOpenModal = document.querySelector('#btnOpenModal')
    const modalBlock = document.querySelector('#modalBlock')
    const closeModal = document.querySelector('#closeModal')
    const questionTitle = document.querySelector('#question')
    const formAnswers = document.querySelector('#formAnswers')
    const nextButton = document.querySelector('#next')
    const prevButton = document.querySelector('#prev')
    const sendButton = document.querySelector('#send')

    let myVar = 5

    switch (myVar) {
        case 1:
        case 2:
            console.log('Меньше 3')
            break
        case 5:
            console.log('Больше 3')
            break
        case 3:
            console.log('Равен 3')
            break
        default:
            console.log('Не один из вариантов')
    }

    // ==================================================
    switch (true) {
        case (myVar === 1):
        case (myVar === 2):
            console.log('Меньше 3')
            break
        case (myVar === 5):
            console.log('Больше 3')
            break
        case (myVar === 3):
            console.log('Равен 3')
            break
        default:
            console.log('Не один из вариантов')
    }

    // Объект, содержащий вопросы и ответы
    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    // Обработчики событий откр/закр мод. окна
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block')
        playTest()
    })

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block')
    })

    // Фун. запуска тестирования
    const playTest = () => {

        // Ответы пользователей
        const finalAnswers = []

        // Счетчик 
        let numberQuestion = 0

        // фун. рендеринг ответов
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div')

                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center')

                answerItem.innerHTML = `
                    <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                    <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span> 
                    </label>
                `


                formAnswers.appendChild(answerItem)

                // Вызов фун. отображения кнопки prev
                changeBtnPrev()

            })
        }

        // фун. отображения кнопки prev
        const changeBtnPrev = () => {
            if (numberQuestion === 0) {
                prevButton.style.display = 'none';
            } else {
                prevButton.style.display = 'block';
            }
        }

        // фун. рендеринга вопросов + ответов
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = ''

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`
                renderAnswers(indexQuestion)
                nextButton.classList.remove('d-none')
                sendButton.classList.add('d-none')
            }

            // фун. отображения ввода номера  
            if (numberQuestion === questions.length) {
                nextButton.classList.add('d-none')
                prevButton.style.display = 'none';
                sendButton.classList.remove('d-none')

                formAnswers.innerHTML = `
                <div class="form-group">
                    <label for="numberPhone">Enter your number</label>
                    <input type="phone" class="form-control" id="numberPhone">
                </div>
                `
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо за пройденный тест!'
                setTimeout(() => {
                    modalBlock.classList.remove('d-block')
                }, 2000)
            }

        }
        // запуск фун. рендеринга
        renderQuestions(numberQuestion)

        const checkAnswer = () => {
            const obj = {}
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone')

            inputs.forEach((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value
                }

                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value
                }
            })

            finalAnswers.push(obj)
            console.log(finalAnswers)
        }

        // обработчик событий кнопок next 
        nextButton.onclick = () => {
            checkAnswer()
            numberQuestion++
            renderQuestions(numberQuestion)
        }

        // обработчик событий кнопок prev
        prevButton.onclick = () => {
            numberQuestion--
            renderQuestions(numberQuestion)
        }

        sendButton.onclick = () => {
            checkAnswer()
            numberQuestion++
            renderQuestions(numberQuestion)
            console.log(finalAnswers)
        }

    }
})





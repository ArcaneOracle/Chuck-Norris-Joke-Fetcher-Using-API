// Use button to refresh all 3 jokes
function setJoke(id, text) {
	const jokePgs = document.getElementById(id);
	jokePgs.textContent = text;
	jokePgs.classList.remove("hidden");
	jokePgs.classList.add("p-4");
}

async function fetchJokes() {
	try {
		const urls = [
			"https://api.chucknorris.io/jokes/random",
			"https://api.chucknorris.io/jokes/random",
			"https://api.chucknorris.io/jokes/random"
	]

	const responses = await Promise.all(urls.map(url => fetch(url)))
	const data = await Promise.all(responses.map(res => res.json()))

	setJoke(`joke1`, data[0].value)
	setJoke(`joke2`, data[1].value)
	setJoke(`joke3`, data[2].value)
	} catch (error) {
		console.error(`Error fetching jokes: `, error)
	}
}
fetchJokes()

const button = document.getElementById(`button`)
button.addEventListener(`click`, () => {
	document.querySelectorAll(`#mainContainer p`).forEach(p => {
		p.classList.add(`hidden`)
		p.classList.remove(`p-4`)
	})
	fetchJokes()
})

// Click on div 1 to refresh each joke on their own by clicking on their respective divs
/*
// DIV 1
function setJoke(id, text){
	const el = document.getElementById(id)
	el.textContent = text
	el.classList.remove(`hidden`)
	el.classList.add(`p-4`)
}

const joke1Pg = document.getElementById(`joke1`)
async function fetchJoke1() {
	try {
		const mainURL = `https://api.chucknorris.io/jokes/random`
		const joke1Response = await fetch(mainURL)
		const singleData = await joke1Response.json()

		setJoke(`joke1`, singleData.value)
	} catch (error) {
		console.error(`Error fetching joke: `, error)
		joke1Pg.textContent = error
		joke1Pg.classList.remove(`hidden`)
		joke1Pg.classList.add(`p-4`)
	}
}

const divJoke1 = document.getElementById(`divJoke1`)
divJoke1.addEventListener(`click`, () => {
	joke1Pg.classList.add(`hidden`)
	joke1Pg.classList.remove(`p-4`)
	fetchJoke1()
})

// Div 2
const joke2Pg = document.getElementById(`joke2`)
async function fetchJoke2() {
	try {
		const mainURL = `https://api.chucknorris.io/jokes/random`
		const joke2Response = await fetch(mainURL)
		const singleData = await joke2Response.json()

		setJoke(`joke2`, singleData.value)
	} catch (error) {
		console.error(`Error fetching joke: `, error)
		joke2Pg.textContent = error
		joke2Pg.classList.remove(`hidden`)
		joke2Pg.classList.add(`p-4`)
	}
}

const divJoke2 = document.getElementById(`divJoke2`)
divJoke2.addEventListener(`click`, () => {
	joke2Pg.classList.add(`hidden`)
	joke2Pg.classList.remove(`p-4`)
	fetchJoke2()
})


// Div 3
const joke3Pg = document.getElementById(`joke3`)
async function fetchJoke3() {
	try {
		const mainURL = `https://api.chucknorris.io/jokes/random`
		const joke3Response = await fetch(mainURL)
		const singleData = await joke3Response.json()

		setJoke(`joke3`, singleData.value)
	} catch (error) {
		console.error(`Error fetching joke: `, error)
		joke3Pg.textContent = error
		joke3Pg.classList.remove(`hidden`)
		joke3Pg.classList.add(`p-4`)
	}
}

const divJoke3 = document.getElementById(`divJoke3`)
divJoke3.addEventListener(`click`, () => {
	joke3Pg.classList.add(`hidden`)
	joke3Pg.classList.remove(`p-4`)
	fetchJoke3()
})
*/


// Generic function to refresh each div's joke respectfully.
function setEachJoke(id, text) {
	const ele = document.getElementById(id)
	ele.textContent = text
	ele.classList.remove(`hidden`)
	ele.classList.add(`p-4`)
}

async function fetchEachJoke(jokeId) {
	try {
		const eachResponse = await fetch(`https://api.chucknorris.io/jokes/random`)
		const eachData = await eachResponse.json()
		setEachJoke(jokeId, eachData.value)
	} catch (error) {
		console.error(`Error fetching joke: `, error)
		const ele = document.getElementById(jokeId)
		ele.textContent = `Error fetching joke.`
		ele.classList.remove(`hidden`)
		ele.classList.add(`p-4`)
	}
}

const jokeDivs = document.querySelectorAll(`[data-joke-id]`)
jokeDivs.forEach(div => {
	div.addEventListener(`click`, () => {
		const jokeId = div.getAttribute(`data-joke-id`)
		const p = document.getElementById(jokeId)

		p.classList.add(`hidden`)
		p.classList.remove(`p-4`)

		fetchEachJoke(jokeId)
	})
})
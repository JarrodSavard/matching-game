import { useEffect, useState } from 'react';
import { Card } from './components/Card/Card';
import './App.css';

const cardImages = [
	{ src: '/img/bunny-neon-1.jpg', matched: false },
	{ src: 'img/cartoon-city-1.jpg', matched: false },
	{ src: '/img/computer-1.jpg', matched: false },
	{ src: '/img/floating-1.jpg', matched: false },
	{ src: '/img/mage-1.jpg', matched: false },
	{ src: '/img/spaceships-1.jpg', matched: false },
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	// compare 2 cards
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards((prev) => {
					return prev.map((card) => {
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						}
						return card;
					});
				});
				resetTurn();
			} else {
				setTimeout(() => {
					resetTurn();
				}, 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	// start new game automatically
	useEffect(() => {
		shuffleCards();
	}, []);

	// resets choices & increases turns
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prev) => prev + 1);
		setDisabled(false);
	};

	// shuffle the cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	};

	return (
		<div className="App">
			<div>
				<h1 className="title-text">Matching Game</h1>
				<button onClick={shuffleCards}>New Game</button>
				<div className="card-grid">
					{cards.map((card) => (
						<Card handleChoice={handleChoice} disabled={disabled} flipped={card === choiceOne || card === choiceTwo || card.matched} key={card.id} card={card} />
					))}
				</div>
			</div>
			<p className="turns-text">Turns: {turns}</p>
		</div>
	);
}

export default App;

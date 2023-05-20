import React from 'react';
import styles from './Card.module.css';

export const Card = ({ card, handleChoice, flipped, disabled }) => {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	return (
		<div className={styles.card}>
			<div className={flipped ? styles.flipped : ''}>
				<img className={styles.front} src={card.src} alt="card front" />
				<img onClick={handleClick} className={styles.back} src="/img/cover.jpg" alt="card back" />
			</div>
		</div>
	);
};

import { createContext, useState, useEffect } from 'react';

export const SavedContext = createContext<any>({});

type Props = {
	children: JSX.Element;
};

export const SavedContextWrapper = ({ children }: Props) => {
	const [savedArr, setSavedArr] = useState<any>([]);
	const [fetchedSave, setFetchedSave] = useState<any>([]);

	let currCoins = JSON.parse(localStorage.getItem('coins') || '[]');
	useEffect(() => {
		setSavedArr(localStorage.getItem('coins'));
		console.log(currCoins.length)
		if (!currCoins.length) {
			localStorage.setItem('coins', JSON.stringify([]));
		}
	}, []);

	const handleClick = (coin: string) => {
		if (currCoins.includes(coin)) {
			removeCoin(coin, currCoins);
		} else {
			addCoin(coin, currCoins);
		}
	};

	const addCoin = (coin: string, currCoins: Array<string>) => {
		let newCoins = [...currCoins, coin];
		localStorage.setItem('coins', JSON.stringify(newCoins));
		setSavedArr(newCoins);
	};

	const removeCoin = (coin: string, currCoins: Array<string>) => {
		let newCoins = currCoins.filter(item => item != coin);
		localStorage.setItem('coins', JSON.stringify(newCoins));
		setSavedArr(newCoins);
	};

	const getSaveInfo = async () => {
		// setFetchedSave([]);
		try {
			const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currCoins.join(
				'%2C'
			)}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
	`).then(res => res.json());
			setFetchedSave(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<SavedContext.Provider value={{ savedArr, setSavedArr, getSaveInfo, fetchedSave, setFetchedSave, handleClick }}>
			{children}
		</SavedContext.Provider>
	);
};

export default SavedContextWrapper;

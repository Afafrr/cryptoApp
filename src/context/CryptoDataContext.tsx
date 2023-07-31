import { createContext, useEffect, useState } from 'react';

export const CryptoDataContext = createContext<any>({});

type Props = {
	children: JSX.Element;
};

export const CryptoDataWrapper = ({ children }: Props) => {
	const [cryptoData, setCryptoData] = useState([]);
	const [curPage, setCurPage] = useState(1);
	const [lastPage, setlastPage] = useState(100);

	const getData = async () => {
		// setCryptoData([]);
		try {
			console.log(curPage)
			const data = await fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${curPage}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
			).then(res => res.json());
			setCryptoData(data);
			console.log(data);
		} catch (error: any) {
			console.log(error);
		}
	};

	const lastPageFunc = async () => {
		try {
			const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`).then(res => res.json());
			setlastPage(data.length);
			console.log(data.length);
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, [curPage]);

	useEffect(() => {
		lastPageFunc();
	}, []);
	return (
		<CryptoDataContext.Provider value={{ cryptoData, curPage, setCurPage, lastPage }}>
			{children}
		</CryptoDataContext.Provider>
	);
};

export default CryptoDataWrapper;

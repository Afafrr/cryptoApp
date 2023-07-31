import { useLayoutEffect, useContext } from 'react';
import { SavedContext } from '../context/SavedContext';
import TableCrypto from '../components/TableCrypto';

const Saved = () => {
	const { fetchedSave, getSaveInfo } = useContext(SavedContext);

	let currCoins = JSON.parse(localStorage.getItem('coins') || '[]');
	useLayoutEffect(() => {
		getSaveInfo();
	}, []);

	return (
		<div className='flex flex-col justify-center items-center'>
			{currCoins.length ? <TableCrypto coinData={fetchedSave} /> : <p className='mt-10'>You don't have saved coins!</p>}
		</div>
	);
};

export default Saved;

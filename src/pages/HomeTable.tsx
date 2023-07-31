import Pagination from '../components/Pagination';
import TableCrypto from '../components/TableCrypto';
import { CryptoDataContext } from '../context/CryptoDataContext';
import { useContext } from 'react';

const HomeTable = () => {
	let { cryptoData } = useContext(CryptoDataContext);

	return (
		<div className='flex flex-col justify-center '>
			<TableCrypto coinData={cryptoData} />
			<Pagination />
		</div>
	);
};

export default HomeTable;

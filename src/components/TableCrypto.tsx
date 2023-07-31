import { useContext, FC } from 'react';
import Currency from 'react-currency-formatter';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { coinTypes } from './types';
import { SavedContext } from '../context/SavedContext';
import BarLoader from 'react-spinners/ClipLoader';

interface IPROPS {
	coinData: [];
}

const TableCrypto: FC<IPROPS> = ({ coinData }) => {
	const { savedArr, handleClick } = useContext(SavedContext);
	return (
		<div className='w-full text-md text-center'>
			{coinData.length ? (
				<table className='w-full'>
					<thead className='capitalize'>
						<tr className='border-stone-950'>
							<th></th>
							<th>#</th>
							<th className='text-left'>Coin</th>
							<th className='pr-4 text-right'>Price</th>
							<th>1h</th>
							<th>24h</th>
							<th className='sm:table-cell hidden'>7d</th>
							<th className='sm:table-cell hidden'>market cap</th>
						</tr>
					</thead>
					<tbody className='[&>*]:border-t'>
						{coinData.map((coin: coinTypes) => {
							return (
								<tr key={coin?.id} className='py-12'>
									<td className='w-1' onClick={() => handleClick(coin.id)}>
										{savedArr.includes(coin.id) ? <AiFillStar /> : <AiOutlineStar />}
									</td>
									<td className='sm:py-4 py-6 w-4 pr-4'>{coin?.market_cap_rank}</td>
									<td className='text-left'>
										<img src={coin.image} className='w-6 mr-2 inline-block'></img>
										{coin.id}
									</td>
									<td className='pr-4 text-right min-w-fit'>
										<Currency quantity={coin?.current_price} />
									</td>
									<td className={coin.price_change_percentage_1h_in_currency > 0 ? ' text-green-500' : 'text-red-500'}>
										{coin.price_change_percentage_1h_in_currency?.toFixed(2)}
									</td>
									<td className={coin.price_change_percentage_24h > 0 ? ' text-green-500' : 'text-red-500'}>
										{coin.price_change_percentage_24h_in_currency?.toFixed(2)}
									</td>
									<td
										className={`sm:table-cell hidden ${
											coin.price_change_percentage_7d_in_currency > 0 ? ' text-green-500' : 'text-red-500'
										}`}>
										{coin.price_change_percentage_7d_in_currency?.toFixed(2)}
									</td>
									<td className='sm:table-cell hidden'>
										<Currency quantity={coin?.market_cap} pattern='##,### !' decimal=' ' group=' ' />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>
					<BarLoader color='#36d7b7' className='m-10' />
				</div>
			)}
		</div>
	);
};

export default TableCrypto;

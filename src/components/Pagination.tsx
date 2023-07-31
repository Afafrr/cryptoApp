import { useContext } from 'react';
import { CryptoDataContext } from '../context/CryptoDataContext';

function Pagination() {
	let { curPage, setCurPage, lastPage } = useContext<any>(CryptoDataContext);

	lastPage = Math.ceil(lastPage / 10);

	function next() {
		if (curPage < lastPage) {
			setCurPage(curPage + 1);
		}
	}
	function prev() {
		if (curPage > 1) {
			setCurPage(curPage - 1);
		}
	}

	function changeCol(page: number) {
		return curPage === page ? 'bg-orange-300' : 'bg-white';
	}

	return (
		<div className='flex justify-center my-2 text-md [&>*]:p-2 w-full'>
			<button className='' onClick={prev}>
				left{' '}
			</button>
			{curPage > 3 ? (
				<>
					<button onClick={() => setCurPage(1)}> 1 </button>
					<button className='p-2'>...</button>
				</>
			) : null}
			<button className={` ${changeCol(1)}`} onClick={() => (curPage <= 2 ? prev() : setCurPage(curPage - 2))}>
				{curPage > 3 ? curPage - 2 : '1'}
			</button>
			<button className={` ${changeCol(2)}`} onClick={() => (curPage > 2 ? setCurPage(curPage - 1) : setCurPage(2))}>
				{curPage > 3 ? curPage - 1 : '2'}
			</button>
			<button
				className={`${curPage > 2 ? 'bg-orange-300' : 'bg-white'}`}
				onClick={() => (curPage < 3 ? setCurPage(3) : null)}>
				{curPage > 3 ? curPage : '3'}
			</button>
			{curPage < lastPage ? (
				<button onClick={() => (curPage < 4 ? setCurPage(4) : setCurPage(curPage + 1))}>
					{curPage > 3 ? curPage + 1 : '4'}{' '}
				</button>
			) : null}
			{curPage < lastPage - 1 ? (
				<button onClick={() => (curPage < 4 ? setCurPage(5) : setCurPage(curPage + 2))}>
					{curPage > 3 ? curPage + 2 : '5'}
				</button>
			) : null}
			{curPage < lastPage - 2 ? (
				<>
					<button className='p-2'>...</button>
					<button className='p-2' onClick={() => setCurPage(lastPage)}>
						{lastPage}
					</button>
				</>
			) : null}
			<button onClick={next}>right</button>
		</div>
	);
}

export default Pagination;

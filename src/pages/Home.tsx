import { Outlet, NavLink } from 'react-router-dom';
import CryptoDataWrapper from '../context/CryptoDataContext';
import SavedContextWrapper from '../context/SavedContext';
import ErrorFallback from '../components/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
const Home = () => {
	return (
		<div className='relative left-1/2 -translate-x-1/2 w-11/12 max-w-6xl'>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<CryptoDataWrapper>
					<SavedContextWrapper>
						<main>
							<div className='bg-slate-100 flex justify-between'>
								<NavLink to='/' className='p-2 ml-10 sm:ml-24 hover:bg-slate-300 transition-colors'>
									Home
								</NavLink>
								<NavLink to='/saved' className='p-2 mr-10 sm:mr-32 hover:bg-slate-300 transition-colors'>
									Saved
								</NavLink>
							</div>
							<Outlet />
						</main>
					</SavedContextWrapper>
				</CryptoDataWrapper>
			</ErrorBoundary>
		</div>
	);
};

export default Home;

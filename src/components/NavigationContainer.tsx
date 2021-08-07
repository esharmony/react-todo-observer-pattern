import { useEffect } from 'react';
import Navigation from './navigation';
import TodoInfo from './todoInfo';

const NavigationContainer: React.FC = () => {

	useEffect(() => {
		console.log('navigation container updating');
	})
	
	return (
		<>
			<div id="navContainer">
				<Navigation />
				<TodoInfo />
			</div>
		</>
	);
};

export default NavigationContainer;

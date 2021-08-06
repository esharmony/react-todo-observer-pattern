import Navigation from './navigation';
import TodoInfo from './todoInfo';

const NavigationContainer: React.FC = () => {
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

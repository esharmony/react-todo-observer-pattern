import React from 'react';
import List from './list';
import ListControl from '../components/listControl';
import NavigationContainer from './NavigationContainer';

export default class Component extends React.Component {
    componentDidUpdate(){
        console.log('container updating')
    }
	render() {
		return (
			<>
				<NavigationContainer />
				<List />
				<ListControl />
			</>
		);
	}
}

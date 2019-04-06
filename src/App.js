import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			bulbColour: 'bulb',
			glowColour: 'glow',
			roomData: [],
			peopleInRoom: []
		}
	}

	componentDidMount() {
		setInterval(this.checkForRoomUpdate, 3500);
	}
	
	checkForRoomUpdate = async () => {
        let config = {
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJwYXNzIjoiYWRtaW4iLCJpYXQiOjE1NTQzMzE3NDYsImV4cCI6MS4wMDAwMDAwMDAwMDE1NTQ1ZSsyMX0.qzxBdYfCGxcvQkhaCBsKiC7DVVG0wOZMe68axjw0x5M"
            }
        }
		let res = await axios.get("http://projects.danjscott.co.uk/intheroom/Present", config);
		if(res.status === 204){
            this.setState({bulbColour: "bulb", glowColour: "glow"})
		}
		else{
			const peopleInRoom = res.data.data;
			console.log(peopleInRoom);
			let interval = 2500
			if(peopleInRoom.length > 0){
				await peopleInRoom.forEach((person, index) => {
					setTimeout(() => {
						let bulbColour = "bulb-" + person.Name;
						let glowColour = "glow-" + person.Name;
						this.setState({bulbColour, glowColour})
					}, interval * index)
				});
			}
			else{
				this.setState({bulbColour: "bulb", glowColour: "glow"})
			}
		}
	}

	render() {
		return (
			<div className="App">
				<div className="frame">
				<svg width="76px" height="94px" viewBox="0 0 76 94" id={this.state.bulbColour}>
					<path
						d="M76,37.037 C76,59.939 55.6428571,75.427 55.6428571,93.5 L20.3571429,93.5 C20.3571429,75.427 0,59.9335 0,37.037 C0,13.1505 18.9891429,0 37.9782857,0 C56.9891429,0 76,13.167 76,37.037 L76,37.037 Z"
					></path>
				</svg>

				<div id={this.state.glowColour}></div>

				<svg width="32px" height="33px" viewBox="0 0 32 33" id="base">
					<path
						d="M29.3333333,0 L2.66666667,0 C1.19466667,0 0,1.232 0,2.75 C0,4.268 1.19466667,5.5 2.66666667,5.5 L29.3333333,5.5 C30.8053333,5.5 32,4.268 32,2.75 C32,1.232 30.8053333,0 29.3333333,0 L29.3333333,0 Z M29.3333333,11 L2.66666667,11 C1.19466667,11 0,12.232 0,13.75 C0,15.268 1.19466667,16.5 2.66666667,16.5 L29.3333333,16.5 C30.8053333,16.5 32,15.268 32,13.75 C32,12.232 30.8053333,11 29.3333333,11 L29.3333333,11 Z M30.6666667,22 L1.33333333,22 L9.072,31.1245 C10.0853333,32.3125 11.552,33 13.088,33 L18.9173333,33 C20.4533333,33 21.9146667,32.3125 22.928,31.1245 L30.6666667,22 L30.6666667,22 Z"
					></path>
				</svg>
				</div>
			</div>
		);
	}
}

export default App;

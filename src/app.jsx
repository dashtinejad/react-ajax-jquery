import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { list: [] };

		this._ajaxPromise = null;
	}

	getRepos(username) {
		if (this._ajaxPromise) {
			this._ajaxPromise.abort();
		}

		let url = `https://api.github.com/users/${username}/repos?per_page=100`;
		let request = $.get(url);

		request.done(result => {
			this.setState({ list: result });
		});

		request.fail(error => {
			if (error.statusText === 'abort') {
				return;
			}

			alert(error.responseJSON.message);
		});

		this._ajaxPromise = request;
	}

	render() {
		return <div>
			<h1>Ajax</h1>
			<button onClick={() => this.getRepos('facebook')}>Facebook</button>
			<button onClick={() => this.getRepos('microsoft')}>Microsoft</button>
			<button onClick={() => this.getRepos('google')}>Google</button>

			<List data={this.state.list} />
		</div>;
	}
}

class List extends React.Component {
	render() {
		if (! this.props.data.length)
			return <div>Please select an organization</div>;

		const listItems = this.props.data.map(item => 
			<li key={item.id}>
				{item.name}
			</li>
		);

		return <ul>{listItems}</ul>;
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('app')
);
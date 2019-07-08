import * as React from 'react';
import './App.css';
import ReactMarkdown from 'react-markdown';
import io from 'socket.io-client';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        };

        if (process.env.NODE_ENV === 'production') {
            this.socket = io(':8888');
        } else if (process.env.NODE_ENV === "development") {
            this.socket = io('http://localhost:8888');
        }

        this.socket.on('load', (data) => {
            console.log(data);
            this.setState({input: data.MDText});
        });
        this.socket.on('update', (data) => {
            console.log('updateを受update信');
            this.setState({input: data.MDText});
        });
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        e.preventDefault();
        this.socket.emit('update', {MDText: e.target.value});
        this.setState({input: e.target.value});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">1md</h1>

                </header>
                <main className="main">
                    <textarea value={this.state.input} onChange={this.handleTextChange} className="textarea" cols={30}
                              rows={50}/>
                    <ReactMarkdown className="markDown" source={this.state.input}/>
                </main>
            </div>
        );
    }
}

export default App;

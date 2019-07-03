import * as React from 'react';
import './App.css';

const ReactMarkdown = require('react-markdown');

const input: string = '# This is a header\n\n - item1\n\n       - item2\n\n### header2';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">1md</h1>
                </header>
                <main className="main">
                    <textarea className="textarea" cols={30} rows={50}/>
                    <ReactMarkdown className="markDown" source={input}/>
                </main>
            </div>
        );
    }
}

export default App;

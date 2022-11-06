import React, { Component } from 'react'
import Api from './Api'


class App extends Component {
    state = {
        page: '',
        index: ''
    }

    changePage = (txt, index) => {
        this.setState({
            page: txt,
            index: index
        })
    }

    render() {
        if (this.state.page === 'view_instrument') {
            return (<Api changePage={this.changePage} index={this.state.index} render_type='view_instrument' />)

        }
        else if (this.state.page === 'view_all') {
            return (
                <div className="App">
                    {/* <h1>Hello, React!</h1> */}
                    <Api changePage={this.changePage} render_type='view_all' />
                </div>
            )
        }
        else if (this.state.page === 'view_assign') {
            return (
                <div className="App">
                    {/* <h1>Hello, React!</h1> */}
                    <Api changePage={this.changePage} render_type='view_assign' />
                </div>
            )
        } else if (this.state.page === 'assign') {
            return (
                <div className="App">
                    <h1>Here is assign page</h1>
                    <button onClick={() => this.changePage('', '')}>Back</button>
                </div>
            )
        } else if (this.state.page === 'add') {
            return (
                <div className="App">
                    <h1>Here is add instrument page</h1>
                    <button onClick={() => this.changePage('', '')}>Back</button>
                </div>
            )
        }
        else {
            return (
                <div className="App">
                    <h1>Instrument Check</h1>
                    <button onClick={() => this.changePage('add', '')}>Add</button>
                    <button onClick={() => this.changePage('view_assign', '')}>Assign</button>
                    <button onClick={() => this.changePage('view_all', '')}>View</button>
                </div>
            )
        }
    }
}

export default App
import React, {Component} from 'react';
import {Dispatcher} from 'flux';
import {EventEmitter} from 'events'
import keyMirror from '../node_modules/fbjs/lib/keyMirror';

const actions = keyMirror({
   PLUS_ACTION: null
});

const appDispatcher = new Dispatcher();

const handleClick = (action) => {
    appDispatcher.dispatch(action);
};
let initialState = {count: 0};
const store = {
    setState: (newState) => {
        initialState = newState
    },
    getState: () => {
        return initialState
    }
};

appDispatcher.register(action => {
    switch (action.type) {
        case actions.PLUS_ACTION: {
            const {value} = action;
            const state = store.getState();
            store.setState({count: state.count + value});
            break;
        }
        default:
            return null
    }
});

class DashboardButton extends React.Component {
    constructor(props, contexts) {
        super(props, contexts);
        this.state = store.getState();
    }
    render() {
        const {count} = this.state;
        return (
            <div>
                <h2>Counter: {count}</h2>
            </div>
        )
    }
}

class PlusButton extends React.Component {
    render() {
        return (
            <button onClick={this.onButtonClick.bind(this)}>
                Plus one
            </button>
        )
    }
    onButtonClick(e) {
        e.preventDefault();
        handleClick({
            type: actions.PLUS_ACTION,
            value: 1
        });
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>App</h1>
                <DashboardButton />
                <PlusButton/>
            </div>
        );
    }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

var R1 = (
    <p>这是一个函数式组件</p>
)

class Person extends React.Component {
    constructor(props) {
        super()
        this.state = {
            'username': props.username
        }
    }

    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }

    componentDidMount() {
        console.log('Component DID MOUNT!')
    }

    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECEIVE PROPS!')

        this.setState({
            username: newProps.username
        })
    }

    shouldComponentUpdate(newProps, newState) {
        console.log('Component Should Update!')
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }

    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }


    handleClick() {
        this.setState({
            username: '尤雨溪'
        })
    }

    show(msg) {
    }

    render() {
        return (
            <div>
                <h3 ref='title' onClick={(e) => this.show(this.state.msg)}>姓名: {this.state.username}</h3>
                <button onClick={this.handleClick.bind(this)}>改变名字</button>
            </div>
        )
    }
}

class Box extends React.Component {

    constructor() {
        super();

        this.state = {
            name: '钟俊',
            showPerson: true
        }
    }

    onClick() {
        this.setState({
            name: '孙千',
            showPerson: false
        })
    }

    render() {
        var person;

        return (
            <div>
                {<Person username={this.state.name}/>}
                <button onClick={this.onClick.bind(this)}>改名</button>
                {R1}
            </div>
        )
    }
}

angular.module('app')
    .controller('CReact', function () {

        ReactDOM.render(<Box/>, $('#react')[0]);
    })
import {Component} from "react";
import "./navbar.css";
import PropTypes from "prop-types";

class Navbar extends Component {

    static propTypes = {
        onNewGame: PropTypes.func.isRequired,
    }

    render() {
        return (
            <div className="navbar">
                <h1>Memory Game</h1>
                <button onClick={this.props.onNewGame}>
                    New Game
                </button>
            </div>
        )
    }
}

export default Navbar;

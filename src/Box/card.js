import {Component} from "react";
import PropTypes from "prop-types";
import './card.css';

export const CardStatus = {
    matched: 0,
    unmatched: 1,
    showing: 2,
}

class Card extends Component {

    static propTypes = {
        card: PropTypes.object,
        onCardClicked: PropTypes.func.isRequired,
    }

    render() {
        const card = this.props.card;
        let backgroundColor = "Grey";

        if(card.status === CardStatus.matched)
            backgroundColor = card.color;
        else if (card.status === CardStatus.showing)
            backgroundColor = card.color;

        return (
            <div
                id={card.id}
                style={{
                    backgroundColor: backgroundColor
                }}
                onClick={this.props.onCardClicked}
                className="card">
            </div>
        )
    }
}

export default Card;


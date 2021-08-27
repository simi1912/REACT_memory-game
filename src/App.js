import './App.css';
import {Component} from "react";
import Navbar from "./navbar/navbar";
import Card, {CardStatus} from "./Box/card";

class App extends Component {

    firsShownCard = null;

    constructor(props) {
        super(props);

        this.state = {
            cards: [
                {id: 0, color: "Aqua",status: CardStatus.unmatched},
                {id: 1, color: "Aqua", status: CardStatus.unmatched},
                {id: 2, color: "Crimson", status: CardStatus.unmatched},
                {id: 3, color: "Crimson", status: CardStatus.unmatched},
                {id: 4, color: "DarkGreen", status: CardStatus.unmatched},
                {id: 5, color: "DarkGreen", status: CardStatus.unmatched},
                {id: 6, color: "DarkOrange", status: CardStatus.unmatched},
                {id: 7, color: "DarkOrange", status: CardStatus.unmatched},
                {id: 8, color: "DeepPink", status: CardStatus.unmatched},
                {id: 9, color: "DeepPink", status: CardStatus.unmatched},
                {id: 10, color: "Blue", status: CardStatus.unmatched},
                {id: 11, color: "Blue", status: CardStatus.unmatched},
                {id: 12, color: "BlueViolet", status: CardStatus.unmatched},
                {id: 13, color: "BlueViolet", status: CardStatus.unmatched},
                {id: 14, color: "Bisque", status: CardStatus.unmatched},
                {id: 15, color: "Bisque", status: CardStatus.unmatched},
            ]
        }
        this.setState( {state: this.shuffle(this.state.cards)});

        this.onCardClicked = this.onCardClicked.bind(this);
        this.onNewGame = this.onNewGame.bind(this);
    }

    shuffle(cards) {
        for (let i = cards.length-1; i >= 0; i--) {
            var randomIndex = Math.floor(Math.random() * i+1);
            var temp = cards[i];
            cards[i] = cards[randomIndex];
            cards[randomIndex] = temp;
        }

        return cards;
    }

    onCardClicked (e) {
        const clickedCardId = +e.target.getAttribute("id");
        let clickedCard;

        const updatedCards = this.state.cards.map( card => {
            if(card.id === clickedCardId) {
                clickedCard = card;
                return clickedCard;
            }
            return card;
        });

        const isMatched = clickedCard.status === CardStatus.matched;
        const isFirstCardShown = this.firsShownCard !== null;
        const isMatchingTheFirstCard = this.firsShownCard ?
            this.firsShownCard.color === clickedCard.color: false;

        if(isMatched){
            return;
        } else {
            if(isFirstCardShown){
                if(isMatchingTheFirstCard){
                    this.firsShownCard.status = CardStatus.matched;
                    clickedCard.status = CardStatus.matched;
                    this.firsShownCard = null;
                } else {
                    clickedCard.status = CardStatus.showing;
                    setTimeout( () => {
                        this.firsShownCard.status = CardStatus.unmatched;
                        clickedCard.status = CardStatus.unmatched;
                        this.setState({...updatedCards});
                        this.firsShownCard = null;
                    }, 500);
                }
            } else{
                clickedCard.status = CardStatus.showing;
                this.firsShownCard = clickedCard;
            }
        }

        this.setState({...updatedCards});
    }

    onNewGame() {
        const updatedCards = this.state.cards.map( card => {
            card.status = CardStatus.unmatched;
            return card;
        });

        this.setState({...updatedCards});
    }

    render() {
        const cardElements = this.state.cards.map(card => {
            return (
                <Card key={card.id} card={card} onCardClicked={this.onCardClicked}/>
            )
        });

        return (
            <div className="App">
                <Navbar onNewGame = {this.onNewGame} />
                <div className={"cards"}>
                    {cardElements}
                </div>
            </div>
        );
    }
}

export default App;

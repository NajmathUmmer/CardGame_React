import * as React from "react";
import Card from "./Card";
import "./Game.css";

interface Icard {
  id: string;
  text: string;
  flip: boolean;
  match: boolean;
}
// tslint:disable-next-line:no-empty-interface
interface IflipCard extends Icard {
}
interface IProps {
  cardNum: number;
}
interface IgameState {
  cardData: Icard[];
  FlippedCard: IflipCard | undefined;
  active: number;
}
class Game extends React.Component<IProps, IgameState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      FlippedCard: undefined,
      active: 0,
      cardData: []
    };
    this.handleFlip = this.handleFlip.bind(this);
  }
  public componentDidMount() {
    const card = this.state.cardData;
    // tslint:disable-next-line:no-console
    const completeSymbols = ["🦁", "🐯", "🐻", "🐺", "🐼","🐲","🐵","🐷","🐰","🐴"];
    const symbols = [];
    
    let pairNum = this.props.cardNum;
    while (pairNum > 0) {
      length = completeSymbols.length;
      const index = Math.floor(Math.random() * length);
      pairNum--;
      symbols.push(completeSymbols[index]);
      completeSymbols.splice(index,1);
    }
    let count = 0;
    for (let i = 0; i < this.props.cardNum; i++) {
      for (let j = 0; j < 2; j++) {
        card.push({
          flip: false,
          id: (count++).toString(),
          match: false,
          text: symbols[i]
        });
      }
    }
    let counter = card.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp: any = card[counter];
      card[counter] = card[index];
      card[index] = temp;
    }
    this.setState({
      cardData: card
    });
  }
  public handleFlip(id: string) {
    const cardData = this.state.cardData.map(card => {
      if (card.id === id) {
        card.flip = !card.flip;
        if (card.flip) {
          let active = this.state.active;
          this.setState(
            {
              active: ++active
            },
            () => {
              // tslint:disable-next-line:no-console
              console.log("active", this.state.active);
            }
          );
          const activeCard = this.state.FlippedCard;
          if (activeCard) {
            if (activeCard.text === card.text) {
              // tslint:disable-next-line:no-console
              console.log("match");
              this.setState(
                {
                  FlippedCard: undefined
                },
                () => {
                  card.match = true;
                  const MatchedCard = this.state.cardData.indexOf(activeCard);
                  this.state.cardData[MatchedCard].match = true;
                }
              );
            } else {
              this.setState(
                {
                  FlippedCard: undefined,
                });
            }
          } else {
            this.setState({
              FlippedCard: card
            });
          }
        } else {
          let active = this.state.active;
          this.setState({
            FlippedCard: undefined,
            active: --active
          }, () => {
            // tslint:disable-next-line:no-console
            console.log("active", this.state.active);
          });
        }
      }
      if (this.state.active >= 2) {
        card.flip = false;
        // if (card.id === id) {
        //   card.flip = true;
        // }
        // // tslint:disable-next-line:no-console
        // console.log("active ds", this.state.active);
        this.setState(
          {
            FlippedCard: undefined,
            active: 0
          })
      }
      return card;
    });

    this.setState({
      cardData
    });

  }
  public render() {
    const componentToRender = this.state.cardData.map((card, index) => (
      <div key={index} className="inline-block">
        <Card
          id={card.id}
          text={card.text}
          flip={card.flip}
          match={card.match}
          onClick={this.handleFlip}
        />
      </div>
    ));

    return <div>{componentToRender}</div>;
  }
}

export default Game;

import * as React from "react";
import Game from './Game';
import "./Game.css";

interface Ilevel {
    id: string,
    cardNum: number
}
interface IAppstate {
    level: Ilevel,
    levelSelected: boolean
}
class App extends React.Component<{}, IAppstate>{
    constructor(props: {}) {
        super(props);
        this.state = {
            level: {
                cardNum: 3,
                id: "Easy",
            },
            levelSelected: false
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.initialView = this.initialView.bind(this);

    }
    public handleSelect(e: React.MouseEvent<HTMLAnchorElement>) {
        const targetID = e.currentTarget.id;
        switch (targetID) {
            case "Medium": {
                this.setState({
                    level: {
                        cardNum: 8,
                        id: targetID,
                    },
                    levelSelected:true
                },()=>{
                    // tslint:disable-next-line:no-console
                    console.log(this.state.level);
                });
                break;
            }
            case "Difficult": {
                this.setState({
                    level: {
                        cardNum: 10,
                        id: targetID,
                    },
                    levelSelected:true
                });
                break;
            }
            default: {
                this.setState({
                    level: {
                        cardNum: 4,
                        id: targetID,
                    },
                    levelSelected:true
                });
                break;
            }
        }
        e.preventDefault();

    }
    public initialView() {
        return (<div>
            Increase your Concenteration
                <a
                id="Easy"
                href=""
                onClick={this.handleSelect}
                data-toggle="pill"
            >
                Easy
                    </a><br />
            <a
                id="Medium"
                href=""
                onClick={this.handleSelect}
                data-toggle="pill"
            >
                Medium
                    </a><br />
            <a
                id="Difficult"
                href=""
                onClick={this.handleSelect}
                data-toggle="pill"
            >
                Difficult
    </a>
        </div>);
    }

    public render() {
        const componentToRender = this.state.levelSelected ? <Game cardNum={this.state.level.cardNum}/> : this.initialView();
        return (
            <div>
                {componentToRender}
            </div>
        )

    }
}

export default App;
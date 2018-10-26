import * as React from "react";
import "./Game.css";

interface IcardProps {
  text: string;
  flip: boolean;
  id:string;
  match:boolean;
  onClick:(id:string)=>any;
}

class Card extends React.Component<IcardProps, {}> {
    constructor(props: IcardProps){
        super(props);
        this.handleFlip=this.handleFlip.bind(this);

    }
    public handleFlip(e: React.MouseEvent<HTMLDivElement>){
        
        this.props.onClick(this.props.id);
    }
  public render() {
      
    return <div className={this.props.match?"invisible":""}>
    <div className={this.props.flip ? "card" : "card invi"} onClick={this.handleFlip}>
      <div className={this.props.flip?"card-body":" card-body invisible"}><b>{this.props.text}</b></div>
    </div>
  </div>;
  }
}

export default Card;

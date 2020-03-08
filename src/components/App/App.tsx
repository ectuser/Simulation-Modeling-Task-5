import * as React from "react";
import "./App.scss";
import Header from "../Header/Header"

export default class App extends React.Component{
    public render(){
        return(
            <Header name="header" count={0} />
        )
    }
}
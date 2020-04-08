import * as React from "react";
import "./App.scss";
import Header from "../Header/Header"
import MainChart from "../MainChart/MainChart";

export default class App extends React.Component{
    public render(){
        return(
            <div>
                <Header name="header" count={0} />
                <MainChart />
            </div>
        )
    }
}

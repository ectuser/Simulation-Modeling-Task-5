import * as React from "react";
import "./App.scss";
import MainChart from "../MainChart/MainChart";

export default class App extends React.Component{
    public render(){
        return(
            <div>
                <MainChart />
            </div>
        )
    }
}

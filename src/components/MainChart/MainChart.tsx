import * as React from "react";
import Game from "../Game";
var LineChart = require("react-chartjs").Line;

interface IProps {

}
interface IState{
    chartData: object;
}

var data = {
    labels: ["0"],
    datasets: [
        {
            // 0
            label: "Заболеваемость (%)",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [0]
        },
        {
            // 1
            label: "Финансирование (%)",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0]
        },
        {
            // 2
            label: "Медицинское оборудование",
            fillColor: "rgba(100,187,205,0.2)",
            strokeColor: "rgba(100,187,205,1)",
            pointColor: "rgba(100,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [0]
        }
    ]
}

export default class MainChart extends React.Component<IProps, IState> {
    private time = 1;
    private game: Game;

    constructor(props : IProps){
        super(props);
        this.state = {
            chartData : data
        };
        this.game = new Game();

        window.setInterval(this.tick.bind(this), 4000);
    }

    private tick() {
        console.log(this.time);
        this.game.tick();

        data.datasets[0].data.push(this.game.illness*100);
        data.datasets[1].data.push(this.game.financing*100);
        data.datasets[2].data.push(this.game.medicalEquipment);
        data.labels.push(this.time.toString());

        this.setState({
            chartData: data
        });

        this.time++;
    }
    public render() {
        return (
            <LineChart data={this.state.chartData} redraw width="600" height="250"/>
        );
    }

}

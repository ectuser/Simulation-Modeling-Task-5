import * as React from "react";
import Game from "../Game";
var LineChart = require("react-chartjs").Line;

interface IProps {

}
interface IState{
    chartData: object;
}

var data = {
    labels: [],
    datasets: [
        {
            // 0
            label: "Amount of doctors and stuff ",
            fillColor: "rgba(152,61,158,0.1)",
            strokeColor: "rgb(152,61,158,1)",
            pointColor: "rgba(152,61,158,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(152,61,158,1)",
            data: []
        },
        {
            // 1
            label: "Amount and quality of equipment",
            fillColor: "rgba(44,173,65,0.1)",
            strokeColor: "rgb(44,173,65,1)",
            pointColor: "rgba(44,173,65,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(44,173,65,1)",
            data: []
        },
        {
            // 2
            label: "Ecology virus influence (%)",
            fillColor: "rgba(100,187,205,0.1)",
            strokeColor: "rgba(100,187,205,1)",
            pointColor: "rgba(100,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(100,187,205,1)",
            data: []
        },
        {
            // 3
            label: "Hospital budget",
            fillColor: "rgba(55,73,193,0.1)",
            strokeColor: "rgb(55,73,193,1)",
            pointColor: "rgba(55,73,193,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(55,73,193,1)",
            data: []
        },
        {
            // 4
            label: "Medicine quality (%)",
            fillColor: "rgba(198,33,33,0.1)",
            strokeColor: "rgba(198,33,33,1)",
            pointColor: "rgba(198,33,33,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(198,33,33,1)",
            data: []
        },
        {
            // 5
            label: "Amount of infected people",
            fillColor: "rgba(13,177,106,0.1)",
            strokeColor: "rgb(13,177,106)",
            pointColor: "rgba(13,177,106,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(13,177,106,1)",
            data: []
        },
        {
            // 6
            label: "Patients death rate",
            fillColor: "rgba(183,196,67,0.1)",
            strokeColor: "rgb(183,196,67, 1)",
            pointColor: "rgba(183,196,67,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(183,196,67,1)",
            data: []
        },
        {
            // 7
            label: "Death Rate",
            fillColor: "rgba(210,99,41,0.1)",
            strokeColor: "rgb(210,99,41,1)",
            pointColor: "rgba(210,99,41,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(210,99,41,1)",
            data: []
        },
        {
            // 8
            label: "Death patients",
            fillColor: "rgba(131,246,123,0.1)",
            strokeColor: "rgb(131,246,123,1)",
            pointColor: "rgb(131,246,123,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(131,246,123,1)",
            data: []
        },
        {
            // 9
            label: "Patients to health people",
            fillColor: "rgba(165,40,40,0.1)",
            strokeColor: "rgb(167,31,31)",
            pointColor: "rgb(161,80,80)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgb(203,120,120)",
            data: []
        },
        {
            // 10
            label: "Amount of patients",
            fillColor: "rgba(54,3,31,0.1)",
            strokeColor: "rgb(101,20,97)",
            pointColor: "rgb(104,46,135)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgb(152,114,167)",
            data: []
        },
        {
            // 11
            label: "Amount of healthy people",
            fillColor: "rgba(161,110,16,0.1)",
            strokeColor: "rgb(163,89,9)",
            pointColor: "rgb(165,99,63)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgb(191,154,45)",
            data: []
        }
    ]
}

export default class MainChart extends React.Component<IProps, IState> {
    private time = 0;
    private game: Game;

    constructor(props : IProps){
        super(props);

        this.game = new Game();

        this.state = {
            chartData : data,
        };

        window.setInterval(this.tick.bind(this), 10000);
    }

    private tick() {
        console.log(this.time);
        this.game.tick();

        // fucking typescript
        // I sure do care about your datatype
        // pls fuck off
        // @ts-ignore
        data.datasets[0].data.push(this.game.ADS);
        // @ts-ignore
        data.datasets[1].data.push(this.game.AQE);
        // @ts-ignore
        data.datasets[2].data.push(this.game.EVI);
        // @ts-ignore
        data.datasets[3].data.push(this.game.HB);
        // @ts-ignore
        data.datasets[4].data.push(this.game.MQ);
        // @ts-ignore
        data.datasets[5].data.push(this.game.AIP);
        // @ts-ignore
        data.datasets[6].data.push(this.game.PDR);
        // @ts-ignore
        data.datasets[7].data.push(this.game.DR);
        // @ts-ignore
        data.datasets[8].data.push(this.game.DP);
        // @ts-ignore
        data.datasets[9].data.push(this.game.PHP);
        // @ts-ignore
        data.datasets[10].data.push(this.game.AOP);
        // @ts-ignore
        data.datasets[11].data.push(this.game.AHP);
        // @ts-ignore
        data.labels.push(this.time.toString());

        this.setState({
            chartData: data
        });

        this.time++;
    }


    public render() {
        // use full screen
        return (
            <LineChart data={this.state.chartData} redraw width="1000" height="700"/>
        );
    }

}

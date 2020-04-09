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
            label: "Заболеваемость (%)",
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
            label: "Финансирование (%)",
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
            label: "Медицинское оборудование",
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
            label: "Качество медицины (%)",
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
            label: "Смертность (%)",
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
            label: "Количество врачей",
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
            label: "Численность населения",
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
            label: "Количество пациентов",
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
            label: "Рождаемость (%)",
            fillColor: "rgba(131,246,123,0.1)",
            strokeColor: "rgb(131,246,123,1)",
            pointColor: "rgb(131,246,123,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(131,246,123,1)",
            data: []
        }
    ]
}

export default class MainChart extends React.Component<IProps, IState> {
    private time = 0;
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

        // fucking typescript
        // I sure do care about your datatype
        // pls fuck off
        // @ts-ignore
        data.datasets[0].data.push(this.game.illness*100);
        // @ts-ignore
        data.datasets[1].data.push(this.game.financing*100);
        // @ts-ignore
        data.datasets[2].data.push(this.game.medicalEquipment);
        // @ts-ignore
        data.datasets[3].data.push(this.game.medicineQuality*100);
        // @ts-ignore
        data.datasets[4].data.push(this.game.mortality*100);
        // @ts-ignore
        data.datasets[5].data.push(this.game.doctorsNum);
        // @ts-ignore
        data.datasets[6].data.push(this.game.populationSize);
        // @ts-ignore
        data.datasets[7].data.push(this.game.patientsNum);
        // @ts-ignore
        data.datasets[8].data.push(this.game.fertility*100);
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
            <div>
                <LineChart data={this.state.chartData} redraw width="1000" height="700"/>
                <div id={"panel"} style={{float: 'right', margin: '30px', textAlign: 'end'}}>
                    <span>Death rate </span>
                    <button>-</button>
                    <input type="text" value="1" style={{width: '50px'}}/>
                    <button>+</button>
                    <br/>

                    <span>Birth rate </span>
                    <button>-</button>
                    <input type="text" value="1" style={{width: '50px'}}/>
                    <button>+</button>
                    <br/>
                </div>
            </div>
        );
    }

}

import * as React from "react";
import Game from "../Game";
var LineChart = require("react-chartjs").Line;

interface IProps {

}
interface IState{
    chartData: object;
    coefsChartData : object
}

var coefsData = {
    labels: [],
    datasets: [
        {
            // 0
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
            // 1
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
            // 2
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
            // 3
            label: "Medicine quality (%)",
            fillColor: "rgba(198,33,33,0.1)",
            strokeColor: "rgba(198,33,33,1)",
            pointColor: "rgba(198,33,33,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(198,33,33,1)",
            data: []
        },
    ]
}

var data = {
    labels: [],
    datasets: [
        {
            // 3
            // 0
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
            // 1
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
            // 2
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
            // 10
            // 3
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
            // 4
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
    private game?: Game;
    
    private sb = 40000000000;
    private bei = 0.1;
    private nvi = 0.1;
    private fr = 0.007;

    private SbInput : React.RefObject<HTMLInputElement>;
    private BeiInput : React.RefObject<HTMLInputElement>;
    private NviInput : React.RefObject<HTMLInputElement>;
    private FrInput : React.RefObject<HTMLInputElement>;

    constructor(props : IProps){
        super(props);

        this.SbInput = React.createRef();
        this.BeiInput = React.createRef();
        this.NviInput = React.createRef();
        this.FrInput = React.createRef();

        this.state = {
            chartData : data,
            coefsChartData : coefsData
        };



        // window.setInterval(this.tick.bind(this), 10000);
        this.tickMethod = this.tickMethod.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    private tick() {
        if (this.time === 0){
            this.game = new Game(
                parseFloat(this.SbInput.current!.value),
                parseFloat(this.BeiInput.current!.value),
                parseFloat(this.NviInput.current!.value),
                parseFloat(this.FrInput.current!.value)
            );
        }
        console.log(this.time);
        this.game?.tick();

        //@ts-ignore
        data.datasets[0].data.push(this.game.HB);
        //@ts-ignore
        data.datasets[1].data.push(this.game.MQ);
        //@ts-ignore
        data.datasets[2].data.push(this.game?.AIP);
        //@ts-ignore
        data.datasets[3].data.push(this.game?.AOP);
        //@ts-ignore
        data.datasets[4].data.push(this.game?.AHP);


        //@ts-ignore
        coefsData.datasets[0].data.push(this.game?.EVI);
        //@ts-ignore
        coefsData.datasets[1].data.push(this.game?.PDR);
        //@ts-ignore
        coefsData.datasets[2].data.push(this.game?.DR);
        //@ts-ignore
        coefsData.datasets[3].data.push(this.game?.MQ);


        // fucking typescript
        // I sure do care about your datatype
        // pls fuck off
        // @ts-ignore
        // data.datasets[0].data.push(this.game.ADS);
        // // @ts-ignore
        // data.datasets[1].data.push(this.game.AQE);
        // // @ts-ignore
        // data.datasets[2].data.push(this.game.EVI);
        // // @ts-ignore
        // data.datasets[3].data.push(this.game.HB);
        // // @ts-ignore
        // data.datasets[4].data.push(this.game.MQ);
        // @ts-ignore
        // data.datasets[5].data.push(this.game.AIP);
        // // @ts-ignore
        // data.datasets[6].data.push(this.game.PDR);
        // // @ts-ignore
        // data.datasets[7].data.push(this.game.DR);
        // // @ts-ignore
        // data.datasets[8].data.push(this.game.DP);
        // // @ts-ignore
        // data.datasets[9].data.push(this.game.PHP);
        // // @ts-ignore
        // data.datasets[10].data.push(this.game.AOP);
        // // @ts-ignore
        // data.datasets[11].data.push(this.game.AHP);
        // @ts-ignore
        data.labels.push(this.time.toString());
        // @ts-ignore
        coefsData.labels.push(this.time.toString());

        this.setState({
            chartData: data,
            coefsChartData : coefsData
        });

        this.time++;
    }
    public tickMethod(){
        this.tick()
    }
    private changeInput(){
        this.game?.reDefineVariables(
            parseFloat(this.SbInput.current!.value),
            parseFloat(this.BeiInput.current!.value),
            parseFloat(this.NviInput.current!.value),
            parseFloat(this.FrInput.current!.value)
        );
    }


    public render() {
        // use full screen
        return (
            <div>
                <span>state budget</span>
                <input onChange={this.changeInput} defaultValue={this.sb} type="number" ref={this.SbInput} placeholder="state budget"/>
                <span>bad ecology influence</span>
                <input onChange={this.changeInput} defaultValue={this.bei} type="text" ref={this.BeiInput} placeholder="bad ecology influence"/>
                <br/>
                <span>new viruses influence</span>
                <input onChange={this.changeInput} defaultValue={this.nvi} type="text" ref={this.NviInput} placeholder="new viruses influence"/>
                <span>fertility rate</span>
                <input onChange={this.changeInput} defaultValue={this.fr} type="number" ref={this.FrInput} placeholder="Fertility Rate"/>
                <button onClick={this.tickMethod}>tick</button>

                <LineChart data={this.state.chartData} redraw width="1000" height="400"/>
                <LineChart data={this.state.coefsChartData} redraw width="1000" height="300"/>
            </div>
        );
    }

}

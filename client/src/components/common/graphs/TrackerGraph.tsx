import React from "react";
import CanvasJSReact from "./canvasjs/canvasjs.react";
import { Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./TrackerGraph.css";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

type Props = {
  dataPoints: { x: Date; y: number }[];
  title: string;
  height: number;
  link: string;
  axisXtitle: string;
  axisXFormat: string;
  axisYtitle: string;
};

const TrackerGraph: React.FC<Props> = (props: Props) => {
  const options = {
    animationEnabled: true,
    theme: "light2",
    height: props.height,
    data: [
      {
        type: "column",
        indexLabel: "{y}",
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: props.dataPoints,
      },
    ],
    axisX: {
      title: props.axisXtitle,
      valueFormatString: props.axisXFormat,
    },
    axisY: {
      title: props.axisYtitle,
    },
  };
  return (
    <Paper elevation={5}>
      <div className="title">
        {" "}
        {props.title} <Link to={props.link}>View All</Link>
      </div>
      <CanvasJSChart options={options} className="graph-style" />
    </Paper>
  );
};

export default TrackerGraph;

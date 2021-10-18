import React from "react";
import MaterialTable, { Column, Options } from "material-table";
import { ListIcons } from "./ListIcons";
import { Row } from "./ListEntities";
import { FormControlLabel, Checkbox, Paper } from "@material-ui/core";
import "./TrackerList.css";

type Props = {
  title: string;
  headers: Array<Column<Row>>;
  data: Row[];
  onAddHandler: (newData: Row) => void;
  onUpdateHandler: (updatedData: Row) => void;
  onDeleteHandler: (oldData: Row) => void;
  onFilterHandler: (event: any) => void;
  rowStyle: Options;
  defaultValue: boolean;
  filterLabel: string;
};

const TrackerList: React.FC<Props> = (props: Props) => {
  return (
    <Paper elevation={5}>
      <div className="list-container">
        <FormControlLabel
          control={<Checkbox onChange={props.onFilterHandler} color="primary" defaultChecked={props.defaultValue} />}
          label={props.filterLabel}
        />
      </div>
      <MaterialTable
        title={props.title}
        columns={props.headers}
        data={props.data}
        icons={ListIcons}
        options={props.rowStyle}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                props.onAddHandler(newData);
              }, 600);
            }),
          onRowUpdate: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                props.onUpdateHandler(newData);
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                props.onDeleteHandler(oldData);
              }, 600);
            }),
        }}
      />
    </Paper>
  );
};

export default TrackerList;

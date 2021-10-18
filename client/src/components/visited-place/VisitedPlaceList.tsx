import React, { useEffect, useState } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { TrackerList } from "../common";
import { Column, Options } from "material-table";
import { Row } from "../common/list/ListEntities";
import { VisitedPlace } from "../../models";
import { RootState } from "../../redux/reducers";
import * as actions from "../../redux/actions/visitedPlaceActions";
import constant from "../../constants/config.json";

const TARGET_DAYS: number = constant.VisitedPlace_Filter_NumDays;

const headers: Column<Row>[] = [
  { title: "Place", field: "name", type: "string", align: "center" },
  { title: "Date", field: "date", type: "date", align: "center" },
  { title: "Hours", field: "hours", type: "numeric", align: "center" },
  {
    title: "Is Crowded?",
    field: "warning",
    type: "boolean",
    align: "center",
  },
];

function mapPlaceToRow(places: VisitedPlace[]): Row[] {
  return places.map((interaction: VisitedPlace) => {
    return {
      name: interaction.place,
      date: interaction.date,
      hours: interaction.hours,
      warning: interaction.isCrowded,
      _id: interaction._id,
    };
  });
}

const rowStyle: Options = {
  rowStyle: (rowData: Row) => ({
    backgroundColor: rowData.warning ? "#fbe4e4" : "#FFF",
  }),
};

function mapRowToPlace(data: Row): VisitedPlace {
  return {
    place: data.name,
    date: data.date,
    hours: data.hours,
    isCrowded: data.warning,
    _id: data._id,
  };
}

const VisitedPlaceList = () => {
  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
  const [filteredList, setFilteredList] = useState<boolean>(false);

  const visitedPlaces = useSelector<VisitedPlace[]>((state) => state.visitedPlace.filteredVisitedPlaces);
  const allVisitedPlaces = useSelector<VisitedPlace[]>((state) => state.visitedPlace.visitedPlaces);
  const serviceCallStarted = useSelector<boolean>((state) => state.serviceStats.visitedPlaceServiceCallStarted);

  useEffect(() => {
    const filterDays = filteredList ? TARGET_DAYS : 0;
    if (!serviceCallStarted) {
      actions
        .loadVisitedPlaces(dispatch)
        .then(() => actions.loadRecentVisitedPlaces(filterDays, dispatch))
        .catch((error) => {
          alert("Loading visited failed" + error);
        });
    } else {
      actions.loadRecentVisitedPlaces(filterDays, dispatch);
    }
  }, [filteredList, allVisitedPlaces]);

  function onSaveHandler(newData: Row) {
    actions.saveVisitedPlace(mapRowToPlace(newData), dispatch);
  }

  function onDeleteHandler(oldData: Row) {
    actions.deleteVisitedPlace(mapRowToPlace(oldData), dispatch);
  }

  function onFilterHandler(event: any) {
    if (event.target.checked) setFilteredList(true);
    else setFilteredList(false);
  }

  const filterTitle = `Display records within last ${TARGET_DAYS} days`;

  return (
    <TrackerList
      title="Visited Places List"
      headers={headers}
      data={mapPlaceToRow(visitedPlaces)}
      onAddHandler={onSaveHandler}
      onUpdateHandler={onSaveHandler}
      onDeleteHandler={onDeleteHandler}
      onFilterHandler={onFilterHandler}
      rowStyle={rowStyle}
      defaultValue={filteredList}
      filterLabel={filterTitle}
    ></TrackerList>
  );
};

export default VisitedPlaceList;

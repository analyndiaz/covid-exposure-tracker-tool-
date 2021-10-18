import React, { useEffect, useState } from "react";
import { useDispatch, TypedUseSelectorHook, useSelector as useReduxSelector } from "react-redux";
import { TrackerList } from "../common";
import { SocialInteraction } from "../../models";
import { RootState } from "../../redux/reducers";
import { Column, Options } from "material-table";
import { Row } from "../common/list/ListEntities";
import * as actions from "../../redux/actions/socialInteractionActions";
import constant from "../../constants/config.json";

const TARGET_DAYS: number = constant.SocialInteraction_Filter_NumDays;

const headers: Column<Row>[] = [
  { title: "Name", field: "name", type: "string", align: "center" },
  { title: "Date", field: "date", type: "date", align: "center" },
  { title: "Hours", field: "hours", type: "numeric", align: "center" },
  {
    title: "Is Social Distancing Observed?",
    field: "warning",
    type: "boolean",
    align: "center",
  },
];

function mapInteractionsToRow(interactions: SocialInteraction[]): Row[] {
  return interactions.map((interaction: SocialInteraction) => {
    return {
      name: interaction.name,
      date: interaction.date,
      hours: interaction.hours,
      warning: interaction.isSocialDistancing,
      _id: interaction._id,
    };
  });
}

function mapRowToInteraction(data: Row): SocialInteraction {
  return {
    name: data.name,
    date: data.date,
    hours: data.hours,
    isSocialDistancing: data.warning,
    _id: data._id,
  };
}

const rowStyle: Options = {
  rowStyle: (rowData: Row) => ({
    backgroundColor: rowData.warning ? "#FFF" : "#fbe4e4",
  }),
};

const SocialInteractionList = () => {
  const dispatch = useDispatch();
  const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
  const [filteredList, setFilteredList] = useState<boolean>(false);

  const filteredSocialInteractions = useSelector<SocialInteraction[]>(
    (state) => state.socialInteraction.filteredSocialInteractions
  );
  const allSocialInteractions = useSelector<SocialInteraction[]>((state) => state.socialInteraction.socialInteractions);
  const serviceCallStarted = useSelector<boolean>((state) => state.serviceStats.socialInteractionServiceCallStarted);

  useEffect(() => {
    const filterDays = filteredList ? TARGET_DAYS : 0;
    if (!serviceCallStarted) {
      actions
        .loadSocialInteractions(dispatch)
        .then(() => actions.loadRecentSocialInteraction(filterDays, dispatch))
        .catch((error) => {
          alert("Loading interactions failed" + error);
        });
    } else {
      actions.loadRecentSocialInteraction(filterDays, dispatch);
    }
  }, [filteredList, allSocialInteractions]);

  function onSaveHandler(newData: Row) {
    actions.saveSocialInteraction(mapRowToInteraction(newData), dispatch);
  }

  function onDeleteHandler(oldData: Row) {
    actions.deleteSocialInteractions(mapRowToInteraction(oldData), dispatch);
  }

  function onFilterHandler(event: any) {
    if (event.target.checked) setFilteredList(true);
    else setFilteredList(false);
  }

  const filterTitle = `Display records within last ${TARGET_DAYS} days`;

  return (
    <TrackerList
      title="Social Interactions List"
      headers={headers}
      data={mapInteractionsToRow(filteredSocialInteractions)}
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

export default SocialInteractionList;

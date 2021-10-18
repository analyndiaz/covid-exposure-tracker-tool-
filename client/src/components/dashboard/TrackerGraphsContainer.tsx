import React, { useEffect } from "react";
import "./TrackerGraphsContainer.css";
import { TrackerGraph } from "../common";
import { useDispatch } from "react-redux";
import * as socialActions from "../../redux/actions/socialInteractionActions";
import * as placeActions from "../../redux/actions/visitedPlaceActions";
import Spinner from "../common/spinner/Spinner";
import constant from "../../constants/config.json";
import useSocialInteractions from "../../hooks/useSocialInteractions";
import useVisitedPlaces from "../../hooks/useVisitedPlaces";
import useService from "../../hooks/useService";

const SOCIAL_TARGET_DAYS: number = constant.SocialInteraction_Graph_NumDays;
const PLACE_TARGET_DAYS: number = constant.VisitedPlace_Graph_NumDays;

const TrackerGraphContainer = () => {
  const height = 200;

  const dispatch = useDispatch();
  const {
    socialInteractions,
    socialInteractionsByDate,
  } = useSocialInteractions();

  const { visitedPlaces, visitedPlacesByDate } = useVisitedPlaces();

  const {
    loading,
    interactionServiceCallStarted,
    placeServiceCallStarted,
  } = useService();

  const interactions = socialInteractionsByDate.map((interaction) => {
    return { x: new Date(interaction.date), y: interaction.count };
  });

  const places = visitedPlacesByDate.map((place) => {
    return { x: new Date(place.date), y: place.count };
  });

  useEffect(() => {
    debugger;
    if (!interactionServiceCallStarted) {
      socialActions
        .loadSocialInteractions(dispatch)
        .then(() => {
          socialActions.loadGroupSocialInteraction(
            SOCIAL_TARGET_DAYS,
            dispatch
          );
        })
        .catch((error) => {
          alert("Loading interactions failed" + error);
        });
    } else {
      socialActions.loadGroupSocialInteraction(SOCIAL_TARGET_DAYS, dispatch);
    }
  }, [socialInteractions]);

  useEffect(() => {
    if (!placeServiceCallStarted) {
      placeActions
        .loadVisitedPlaces(dispatch)
        .then(() => {
          placeActions.loadGroupVisitedPlaces(PLACE_TARGET_DAYS, dispatch);
        })
        .catch((error) => {
          alert("Loading places failed" + error);
        });
    } else {
      placeActions.loadGroupVisitedPlaces(PLACE_TARGET_DAYS, dispatch);
    }
  }, [visitedPlaces]);

  const interactionGraphTitle = `Last ${SOCIAL_TARGET_DAYS} days`;
  const placesGraphTitle = `Last ${PLACE_TARGET_DAYS} days`;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="graph-container">
          <TrackerGraph
            title="Recent Social Interactions"
            dataPoints={interactions}
            height={height}
            link="/social-interactions"
            axisXtitle={interactionGraphTitle}
            axisXFormat="MMM/DD/YYYY"
            axisYtitle="Number of Social Interactions"
          />
          <TrackerGraph
            title="Recent Visted Places"
            dataPoints={places}
            height={height}
            link="/visited-places"
            axisXtitle={placesGraphTitle}
            axisXFormat="MMM/DD/YYYY"
            axisYtitle="Number of Visited Places"
          />
        </div>
      )}
    </>
  );
};

export default TrackerGraphContainer;

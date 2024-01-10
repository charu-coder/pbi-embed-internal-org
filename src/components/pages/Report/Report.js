import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { reportsDataDummy } from "../../../datasets/reports";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "../../../App.scss";
const Report = (props) => {
  const {
    name,
    subMenus,
    iconClassName,
    onClick,
    to,
    exact,
    allReportsData,
    inactive,
  } = props;
  const [expand, setExpand] = useState(false);
  const [selReport, setSelectedReport] = useState(allReportsData?.[0]);
  
  useEffect(() => {
      let selectedReport = allReportsData?.find(report => report.name === props.location.pathname.replace("/report/", "").replace("%20"," "))

      setSelectedReport(selectedReport);

  }, [props.location.pathname]);

  useEffect(() => {
  }, [inactive]);
  return (
    <>
      <h1>{selReport?.name}</h1>
      {selReport && selReport?.id && (
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: selReport?.id,
            embedUrl: selReport?.embedUrl,
            accessToken: `${sessionStorage.getItem("access_token")}`,
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
              ["visualClicked", () => console.log("visual clicked")],
              ["pageChanged", (event) => console.log(event)],
            ])
          }
          cssClassName={"embed-container"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      )}
    </>
  );
};

export default Report;

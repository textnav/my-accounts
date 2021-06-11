import { RouteComponentProps } from "@reach/router";
import React from "react";
import "./NotFound.css";

export default function NotFoundPage(props: RouteComponentProps) {
  return (
    <div className="not-found-container">
      <div className="not-found" title="404">
        404
      </div>
    </div>
  );
}

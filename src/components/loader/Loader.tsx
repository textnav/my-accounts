import React from "react";
import LoaderImg from "../../assets/loader.svg";

export default function Loader(props: { height: string }) {
  const style = {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const imgStyle = {
    height: props.height,
    width: "auto",
  };
  return (
    <div data-testid="loader" style={style}>
      <img style={imgStyle} src={LoaderImg} alt="loading" />
    </div>
  );
}

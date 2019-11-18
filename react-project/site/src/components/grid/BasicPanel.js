import React from "react";
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  header: {
    height: "30px",
    background: "#555",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#469",
  },
  content: { flex: "1" },
};

const BasicPanel = props => {
  return (
    <div style={styles.wrapper}>
      <div className="drag-handle" style={styles.header}>
        {props.name}
      </div>
      <div style={styles.content}>{props.children}</div>
    </div>
  );
};

export default BasicPanel;
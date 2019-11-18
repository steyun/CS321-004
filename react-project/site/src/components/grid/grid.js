import React from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import "./Grid.css";
import BasicPanel from "./BasicPanel";
const ReactGridLayout = WidthProvider(RGL);

const styles = {
  panel: {
    backgroundColor: "#888",
  },
};

class Grid extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    items: [],
    layout: [],
    rowHeight: 20,
    onLayoutChange: function() {},
    cols: 30,
  };

  constructor(props) {
    super(props);

    this.state = { layout: props.layout };
  }

  generateDOM() {
    return this.props.items.map(i => {
      return (
        <div style={styles.panel} key={i.id}>
          <BasicPanel name={i.name}>{i.content}</BasicPanel>
        </div>
      );
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        draggableHandle=".drag-handle"
        useCSSTransforms={false}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

export default Grid;
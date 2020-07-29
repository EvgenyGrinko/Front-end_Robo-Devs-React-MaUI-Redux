import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";

function PaginationBlock(props) {
  return (
    <div style={{ width: "100%", paddingTop: "2rem" }}>
      <ButtonGroup variant="text" color="primary">
        {}
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    </div>
  );
}

export default PaginationBlock;

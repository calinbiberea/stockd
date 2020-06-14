import React from "react";
import { Tab, Tabs, useMediaQuery, Theme, makeStyles, createStyles } from "@material-ui/core";
import { TabBarProps } from "./TabBarTypes";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: "100%",
    },
  })
);

const TabBar: React.FC<TabBarProps> = ({ tabNames, index, setIndex }: TabBarProps) => {
  const classes = useStyles();

  const smallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

  const tabItems = tabNames.map((tabName) => <Tab key={tabName} label={tabName} />);

  const onTabChange = (event: React.ChangeEvent<unknown>, newIndex: number) => setIndex(newIndex);

  return (
    <Tabs
      centered={!smallScreen}
      variant={smallScreen ? "fullWidth" : "standard"}
      textColor="primary"
      indicatorColor="secondary"
      className={classes.container}
      value={index}
      onChange={onTabChange}
    >
      {tabItems}
    </Tabs>
  );
};

export default TabBar;

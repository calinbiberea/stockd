export interface LandingProps {
  setRoute: (Route) => void;
}

export interface LandingTileProps {
  headerText: string;
  items: string[];
  buttonText: string;
  onClick: () => void;
}

export interface LandingScrollTextProps {
  items: string[];
}

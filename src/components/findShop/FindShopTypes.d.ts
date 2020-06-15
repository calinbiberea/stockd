export interface FindShopProps {
  setRoute: (Route) => void;
  editShop?: boolean;
}

export interface LoginProps {
  uid: string | null;
  setUid: (newUid: string | null) => void;
}

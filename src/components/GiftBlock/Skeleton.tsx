import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = () => (
  <ContentLoader
    className="gift-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="113" y="411" rx="0" ry="0" width="1" height="7" />
    <rect x="0" y="10" rx="20" ry="20" width="280" height="280" />
    <rect x="2" y="300" rx="10" ry="10" width="280" height="26" />
    <rect x="0" y="340" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="449" rx="10" ry="10" width="105" height="27" />
    <rect x="130" y="449" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;

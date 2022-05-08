import React from "react";
import { PageWrapper } from "../../utils/CommonComponents";
import SmallScreenProfile from "./SmallScreenProfile";
import LargeScreenProfile from "./LargeScreenProfile";

const ProfilePage = () => {
  return (
    <PageWrapper>
      <LargeScreenProfile />
      <SmallScreenProfile />
    </PageWrapper>
  );
};

export default ProfilePage;

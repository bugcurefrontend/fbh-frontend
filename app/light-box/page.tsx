import LightBox from "@/components/light-box/LightBox";
import { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense>
        <LightBox />
      </Suspense>
    </div>
  );
};
export default page;

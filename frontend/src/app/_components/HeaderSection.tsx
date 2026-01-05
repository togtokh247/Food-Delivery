import { Button } from "@/components/ui/button";
import { HandPlatter } from "lucide-react";
import { Cards } from "./Cards";
import { FooterSection } from "./FooterSection";
import { Lunch } from "./Lunch";
import { Salad } from "./Salad";

export const HeaderSection = () => {
  return (
    <>
      <div className="h-16 bg-black flex items-center px-8 gap-4">
        <div className="flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-3">
            <HandPlatter className="text-red-600 h-[46px] w-[38px]" />

            <div>
              <h1 className="text-2xl font-bold leading-none">
                <span className="text-white">NOM</span>
                <span className="text-red-500">NOM</span>
              </h1>
              <p className="text-white text-s text-center">Swift delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Button
              className="w-[75px] h-[36px] rounded-xl bg-red-500 text-white flex justify-center items-center"
              style={{ backgroundColor: "red" }}
            >
              <h1 className="font-semibold">Sign Up</h1>
            </Button>
            <Button
              className="w-[75px] h-[36px] rounded-xl bg-white text-black flex justify-center items-center"
              style={{ backgroundColor: "white" }}
            >
              <h1 className="font-semibold">Log In</h1>
            </Button>
          </div>
        </div>
      </div>
      <div>
        <img src="/Image.png" className="w-screen h-700px] object-cover" />
      </div>
      <div className="bg-gray-500 min-h-screen pl-20 pr-20">
        <div className="flex justify-between items-center mb-4 w-[1200px] pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Appetizers</h1>
        </div>
        <Cards />
        <div className="flex justify-between items-center mb-4 w-[1200px] pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Salads</h1>
        </div>
        <Salad />
        <div className="flex justify-between items-center mb-4 w-[1200px] pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Lunch favorites</h1>
        </div>
        <div className="pb-20">
          <Lunch />
        </div>
      </div>
      <FooterSection />
    </>
  );
};

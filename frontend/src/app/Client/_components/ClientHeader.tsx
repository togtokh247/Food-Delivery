import { FoodSections } from "@/app/_components/FoodSections";

export const ClientHeader = () => {
  return (
    <>
      <div>
        <img src="/Image.png" className="w-screen h-[700px] object-cover" alt="Food" />
      </div>
      <div className="bg-gray-500 min-h-screen pl-30 pr-20">
        <div className="pb-20">
          <FoodSections />
        </div>
      </div>
    </>
  );
};


import { FoodCards } from "./Cards";

export const ClientHeader = () => {
  return (
    <>
      <div>
        <img src="/Image.png" className="w-screen h-700px] object-cover" />
      </div>
      <div className="bg-gray-500 min-h-screen pl-20 pr-20">
        <div className="flex justify-between items-center mb-4 w-[1200px] pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Appetizers</h1>
        </div>
        <FoodCards />
        <div className="flex justify-between items-center mb-4 w-[1200px] pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Salads</h1>
        </div>
        <FoodCards />
        <div className="flex justify-between items-center mb-4 w-[1200px] pt-20 pb-5">
          <h1 className="text-2xl font-semibold text-white">Lunch favorites</h1>
        </div>
        <div className="pb-20">
          <FoodCards />
        </div>
      </div>
    </>
  );
};

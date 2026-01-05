import {
  Facebook,
  FacebookIcon,
  HandPlatter,
  InstagramIcon,
} from "lucide-react";

export const FooterSection = () => {
  return (
    <div className="h-[755px] bg-black ">
      <div className="pt-20"></div>
      <div className="bg-red-500 flex items-center  h-[92px] justify-center ">
        <div className="animate-marquee whitespace-nowrap flex gap-12  font-semibold text-2xl gap-12 text-white">
          <h1>Fresh fast delivered</h1>
          <h1>Fresh fast delivered</h1>
          <h1>Fresh fast delivered</h1>
          <h1>Fresh fast delivered</h1>
          <h1>Fresh fast delivered</h1>
        </div>
      </div>
      <div className=" bg-black">
        <div className="h-full flex gap-20 pt-20 justify-around">
          <div className=" items-center gap-3 text-center w-[100px] h-[94px] justify-center">
            <HandPlatter className="text-red-600 h-[60px] w-[70px]" />
            <h1 className="text-2xl font-bold leading-none">
              <span className="text-white">NOM</span>
              <span className="text-red-500">NOM</span>
            </h1>
            <p className="text-white text-center flex">Swift delivery</p>
          </div>
          <div>
            <h1 className="text-gray-500 text-xl">NOMNOM</h1>
            <div className="text-white pt-10 space-y-6">
              <h1>Home</h1>
              <h1>Contact Us</h1>
              <h1>Delivery zone</h1>
            </div>
          </div>
          <div>
            <h1 className="text-gray-500 text-xl">Menu</h1>
            <div className="text-white pt-10 space-y-6">
              <h1>Appetizers</h1>
              <h1>Salads</h1>
              <h1>Pizzas</h1>
              <h1>Main dishes</h1>
              <h1>Desserts</h1>
            </div>
          </div>
          <div>
            <div className="text-white pt-16 space-y-6">
              <h1>Side dish </h1>
              <h1>Brunch</h1>
              <h1>Desserts</h1>
              <h1>Beverages</h1>
              <h1>Fish & Sea foods</h1>
            </div>
          </div>
          <div>
            <h1 className="text-gray-500 text-xl">Follow Us</h1>
            <div className="text-white pt-10 gap-4 flex">
              <FacebookIcon />
              <InstagramIcon />
            </div>
          </div>
        </div>

        <div className="pl-20 justify-center pt-20">
          <div className="border-t border-gray-700 w-[1300px] " />
          <div className="flex pt-6 gap-10">
            <p className="text-gray-500">Copy right 2024 © Nomnom LLC</p>
            <p className="text-gray-500">Privacy policy </p>
            <p className="text-gray-500">Terms and conditoin</p>
            <p className="text-gray-500">Cookie policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

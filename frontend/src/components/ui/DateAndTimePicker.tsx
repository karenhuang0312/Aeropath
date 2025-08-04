// src/components/DateAndTimePicker.tsx
import React from "react";
import iphone16Pro from "./iphone-16-pro.png";
import levels from "./levels.svg";
import scrollEdgeEffect from "./scroll-edge-effect.svg";

export const DateAndTimePicker = () => {
  return (
    <div className="w-[402px] h-[874px] rounded-[44px]">
      <div className="relative h-[874px]">
        <div className="flex flex-col w-[402px] h-[874px] items-center justify-center pt-[167px] pb-2.5 px-4 absolute top-0 left-0 bg-[#06192f] rounded-[50px] overflow-hidden">
          <img
            className="absolute w-[402px] h-[167px] top-0 left-0 object-cover"
            alt="Scroll edge effect"
            src={scrollEdgeEffect}
          />
          <div className="relative flex-1 self-stretch w-full grow" />
        </div>

        <div className="absolute w-[402px] h-[34px] top-[840px] left-0">
          <div className="relative w-36 h-[5px] top-[21px] left-[129px] bg-colors-labels-primary rounded-[100px] rotate-180" />
        </div>

        <div className="flex w-[402px] items-center justify-center gap-[154px] pt-[21px] pb-[19px] px-4 absolute top-0 left-0">
          <div className="flex h-[22px] items-center justify-center gap-2.5 pt-0.5 pb-0 px-0 relative flex-1 grow">
            <div className="relative w-fit mt-[-2.00px] font-semibold text-white text-[17px] text-center leading-[22px]">
              9:41
            </div>
          </div>
          <img
            className="relative flex-1 grow h-[22px]"
            alt="Levels"
            src={levels}
          />
        </div>

        <div className="absolute w-[402px] h-[874px] top-0 left-0">
          <img
            className="absolute w-[450px] h-[920px] top-[-23px] -left-6 object-cover"
            alt="Iphone pro"
            src={iphone16Pro}
          />
        </div>
      </div>
    </div>
  );
};

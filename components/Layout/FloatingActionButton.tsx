"use client";

import { Plus } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <button
      className="
        fixed
        bottom-6
        right-6
        z-50

        flex
        h-14
        w-14
        items-center
        justify-center

        rounded-full
        bg-blue-600
        text-white
        shadow-xl

        transition
        hover:scale-110
        hover:bg-blue-700

        lg:hidden
      "
    >
      <Plus size={28} />
    </button>
  );
}
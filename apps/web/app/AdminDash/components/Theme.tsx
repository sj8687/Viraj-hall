"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { ImSun } from "react-icons/im";




export default function Theme() {
    const {theme , setTheme} = useTheme();
     const [mounted, setMounted] = useState(false);

  // Make sure to wait until mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering until mounted
  if (!mounted) return null;

    return (
     <div>
            <Button variant="outline" size="icon" className="rounded-full hover:border-gray-400 border-gray-500" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "dark" ? (
        <ImSun className="h-6 w-6 text-white" />
           ) : (
        <FaMoon className="h-6 w-6 text-gray-500" />
      )}            
      </Button>
    </div>
    )
}
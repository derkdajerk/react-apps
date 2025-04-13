import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const App = () => {
  return (
    <main>
      <div id="navbar" className="flex justify-center-safe">
        <Button className="bg-red-800" size='xlg'>MDC</Button>
        <Button className="bg-gradient-to-t from-red-800 to-gray-800" size="xlg">
          TMILLY
        </Button>
        <Button className="bg-gradient-to-t from-green-800 to-gray-600" size='xlg'>ML</Button>
      </div>

    </main>

  );
};
export default App;

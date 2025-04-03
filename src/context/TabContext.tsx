'use client'
import { createContext, useContext, useEffect, useState } from "react";

const TabContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>({
  activeTab: "dashboard",
  setActiveTab: () => {},
});


export const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    console.log(activeTab);
    
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);

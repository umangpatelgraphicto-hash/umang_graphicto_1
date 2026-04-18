"use client"
import { useState } from "react";
import TemplatesEdit from "@/components/utils/templatesedit/page";
import EditColor from "../editcolor/page";
import ItemList from "../itemedit/page";
import FontEdit from "../fontedit/page";
import IdeaChatBot from "@/components/IdeaChatBot";
import TemplateAIGenerator from "@/components/TemplateAIGenerator";

const panels = [
  { name: "ITEMS", icon: (
    <svg data-v-d511a72a="" viewBox="0 0 20 20" fill="currentColor" className="svg-icon h-5"><path d="M1,2h3v3H1V2z M6,2h13v3H6V2z M1,8h3v3H1V8z M6,8h13v3H6V8z M1,14h3v3H1V14z M6,14h13v3H6V14z"></path></svg>
    ) },
  { name: "HEADING", icon: (
    <svg data-v-d511a72a="" viewBox="0 0 20 20" fill="currentColor" className=" h-5 svg-icon"><polygon points="13,2 19,6 13,10 "></polygon><rect x="1" y="14" width="18" height="4"></rect><path d="M10.5,2.5C10.8,2.5,11,2.3,11,2V1.5C11,1.2,10.8,1,10.5,1H10H8H7.5C7.3,1,7,1.2,7,1.5V2c0,0.3,0.2,0.5,0.5,0.5H8V5H4V2.5
	h0.5C4.7,2.5,5,2.3,5,2V1.5C5,1.2,4.7,1,4.5,1H4H2H1.5C1.2,1,1,1.2,1,1.5V2c0,0.3,0.2,0.5,0.5,0.5H2v7H1.5C1.2,9.5,1,9.7,1,10v0.5
	C1,10.8,1.2,11,1.5,11H2h2h0.5C4.7,11,5,10.8,5,10.5V10c0-0.3-0.3-0.5-0.5-0.5H4V7h4v2.5H7.5C7.3,9.5,7,9.7,7,10v0.5
	C7,10.8,7.3,11,7.5,11H8h2h0.5c0.3,0,0.5-0.2,0.5-0.5V10c0-0.3-0.2-0.5-0.5-0.5H10v-7H10.5z"></path></svg>
    ) },
  { name: "COLORS", icon: (
    <svg data-v-d511a72a="" viewBox="0 0 20 20" fill="currentColor" className=" h-5 svg-icon"><path d="M17.5,7.5C16.1,7.5,15,8.6,15,10c0,0.7-0.6,1.3-1.2,1.3c-0.7,0-1.3-0.6-1.3-1.3V9.7c0-0.4,0.2-0.8,0.5-1l0.4-0.3
	c1-0.8,1.6-2,1.6-3.3V5c0-2.8-2.2-5-5-5C7,0,4.2,1.3,2.3,3.6C0.4,6-0.4,9,0.2,12C1,15.9,4.1,19,8,19.8c0.7,0.1,1.3,0.2,2,0.2
	c2.3,0,4.6-0.8,6.4-2.3C18.7,15.8,20,13,20,10C20,8.6,18.9,7.5,17.5,7.5z M3.3,11.2c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0
	c0.6,0.6,0.6,1.5,0,2.1C4.8,11.8,3.8,11.8,3.3,11.2z M5.9,15.6c-0.8,0-1.5-0.7-1.5-1.5c0-0.8,0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5
	C7.4,14.9,6.8,15.6,5.9,15.6z M5.9,7.7c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5c0.8,0,1.5,0.7,1.5,1.5C7.4,7.1,6.8,7.7,5.9,7.7z
	 M8.8,3.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1s-1.5,0.6-2.1,0S8.2,4.1,8.8,3.5z M10.9,16.7c-0.6,0.6-1.5,0.6-2.1,0
	c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0C11.5,15.2,11.5,16.2,10.9,16.7z"></path></svg>
    ) },
  { name: "FONTS", icon: (
    <svg data-v-d511a72a="" viewBox="0 0 20 20" fill="currentColor" className="h-5 svg-icon"><path d="M5,0c0.4,0,0.8,0.3,0.9,0.7l2.9,7.9l-1.1,2.8L7.2,10H2.8l-0.9,2.3c-0.2,0.5-0.8,0.8-1.3,0.6c-0.5-0.2-0.8-0.8-0.6-1.3l4-11
	C4.2,0.3,4.6,0,5,0L5,0z M3.5,8h3L5,3.9L3.5,8L3.5,8z"></path><path d="M13.4,4.5C13.2,4,12.6,3.8,12.1,4c-0.3,0.1-0.5,0.3-0.6,0.6L6.1,18H6c-0.6,0-1,0.4-1,1s0.4,1,1,1h0.8
	c0,0,0,0,0,0H9c0.6,0,1-0.4,1-1s-0.4-1-1-1H8.3l0.8-2h6.7l0.8,2H16c-0.6,0-1,0.4-1,1s0.4,1,1,1h2c0,0,0,0,0,0h1c0.6,0,1-0.4,1-1
	s-0.4-1-1-1h-0.3L13.4,4.5z M15,14H9.9l2.5-6.4L15,14z" className="st0"></path></svg>
    ) },
  { name: "TEMPLATES", icon: (
<svg data-v-d511a72a="" viewBox="0 0 20 20" fill="currentColor" className=" h-5 svg-icon"><path d="M17.1,2.9c-1.3,0-2.4,0.9-2.8,2.1h-3C11,1.9,8.1-0.3,5,0s-5.3,3.2-5,6.4c0.3,2.6,2.4,4.6,5,5v3c-1.5,0.4-2.4,2-2.1,3.5
	c0.4,1.5,2,2.4,3.5,2.1c1.5-0.4,2.4-2,2.1-3.5c-0.3-1-1-1.8-2.1-2.1v-3c1-0.1,2-0.5,2.8-1.2l2.6,2.6c-0.3,0.4-0.4,0.9-0.4,1.4
	c0,1.6,1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9s-1.3-2.9-2.9-2.9c-0.5,0-1,0.1-1.4,0.4l-2.6-2.6c0.6-0.8,1-1.8,1.2-2.8h3
	c0.4,1.5,2,2.4,3.5,2c1.5-0.4,2.4-2,2-3.5C19.6,3.7,18.4,2.9,17.1,2.9z M5.7,10c-2.4,0-4.3-1.9-4.3-4.3s1.9-4.3,4.3-4.3
	S10,3.3,10,5.7S8.1,10,5.7,10z"></path><circle cx="5.7" cy="5.7" r="2.6"></circle></svg>
    ) },
    { name: "GENERATE", icon: (
        <svg data-v-d511a72a="" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor" className=" h-5 svg-icon"><path d="M9.7 4.2c-1-1-1.7-2.7-2-4.2-.3 1.5-1 3.2-1.9 4.2-1 1-2.6 1.6-4.2 1.9 1.5.3 3.2 1 4.2 1.9 1 1 1.6 2.6 1.9 4.2.3-1.5 1-3.2 2-4.1 1-1 2.6-1.6 4.2-1.9-1.6-.4-3.3-1.1-4.2-2zM15.9 11.9c-.6-.6-1-1.6-1.2-2.5-.2.9-.6 1.9-1.2 2.5-.6.6-1.6 1-2.5 1.2.9.2 1.9.6 2.5 1.2.6.6 1 1.6 1.2 2.5.2-.9.6-1.9 1.2-2.5.6-.6 1.6-1 2.5-1.2-.9-.2-1.9-.6-2.5-1.2zM5.7 13.9c-.2.8-.5 1.6-1 2.1s-1.3.8-2.1 1c.8.2 1.6.5 2.1 1s.8 1.3 1 2.1c.2-.8.5-1.6 1-2.1s1.3-.8 2.1-1c-.8-.2-1.6-.5-2.1-1s-.8-1.4-1-2.1z"></path></svg>
            ) }
];

export default function SidePanel() {
  const [activePanel, setActivePanel] = useState<string>("ITEMS");
  const [openChatbot, setOpenChatbot] = useState(false);
  const [openGenerateModal, setOpenGenerateModal] = useState(false);

  const handlePanelClick = (panelName: string) => {
    if (panelName === "GENERATE") {
      setOpenGenerateModal(true);
    } else {
      setActivePanel(panelName);
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDEBAR */}
      <div className="bg-[#003459] text-white w-16 flex flex-col justify-between py-3">
        <div className="flex flex-col items-center space-y-2">
          {panels.map((panel) => (
            <button
              key={panel.name}
              className={`flex flex-col items-center p-3 rounded hover:bg-[#007ea7]
                ${activePanel === panel.name ? "bg-[#007ea7]" : ""}`}
              onClick={() => handlePanelClick(panel.name)}
            >
              {panel.icon}
              <span className="text-[10px] mt-1">{panel.name}</span>
            </button>
          ))}
        </div>

        {/* CHATBOT ICON */}
        <button
          onClick={() => setOpenChatbot(true)}
          className="mx-auto mb-2 p-3 rounded-full bg-[#007ea7] hover:bg-[#00a8e8]"
          title="Idea Chatbot"
        >
          🤖
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex-1">
        <div className="w-96 bg-white h-screen">
          {activePanel === "TEMPLATES" && <TemplatesEdit />}
          {activePanel === "COLORS" && <EditColor />}
          {activePanel === "ITEMS" && <ItemList />}
          {activePanel === "FONTS" && <FontEdit />}
          {/* Remove the inline GENERATE panel since it will show in modal */}
        </div>
      </div>

      {/* FULLSCREEN GENERATE MODAL */}
      {openGenerateModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          {/* HEADER */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setOpenGenerateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold">AI Template Generator</h2>
            </div>
            <button
              onClick={() => setOpenGenerateModal(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* CONTENT - FULL HEIGHT */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            <TemplateAIGenerator />
          </div>
        </div>
      )}

      {/* CHATBOT MODAL */}
      {openChatbot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[420px] bg-white rounded-xl shadow-lg p-1 relative">
            <button
              onClick={() => setOpenChatbot(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <IdeaChatBot />
          </div>
        </div>
      )}
    </div>
  );
}
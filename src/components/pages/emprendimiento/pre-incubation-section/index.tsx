import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState("01");

  const tabs = [
    {
      id: "01",
      number: "01",
      title: "Is that application work in my area?",
      content:
        "Yes, there are different plug types of payment method available in our mobile application. Here you may find the info credit cards and other available you can use to pay for charging.",
      image: "/placeholder.svg?height=400&width=500",
    },
    {
      id: "02",
      number: "02",
      title: "Can pay yearly subscription for the app?",
      content:
        "Yes, we offer yearly subscription plans that provide additional benefits and savings compared to monthly payments.",
      image: "/placeholder.svg?height=400&width=500",
    },
    {
      id: "03",
      number: "03",
      title: "What payment methods are accepted through the app?",
      content:
        "We accept all major credit cards, PayPal, Apple Pay, and Google Pay as payment methods through our application.",
      image: "/placeholder.svg?height=400&width=500",
    },
    {
      id: "04",
      number: "04",
      title: "Can I check the availability of charging stations in real-time?",
      content:
        "Yes, our app provides real-time information about the availability of charging stations in your area.",
      image: "/placeholder.svg?height=400&width=500",
    },
    {
      id: "05",
      number: "05",
      title: "How do I find charging stations using the app?",
      content:
        "You can easily find charging stations by using the map feature in our app, which shows all available stations near your location.",
      image: "/placeholder.svg?height=400&width=500",
    },
  ];

  return (
    <div
      className="flex flex-col md:flex-row max-w-6xl mx-auto bg-white rounded-xl overflow-hidden shadow-lg"
      role="region"
      aria-label="FAQ Tabs Section"
    >
      {/* Left side - Image */}
      <div
        className="w-full md:w-1/2 relative h-[300px] md:h-auto"
        role="complementary"
        aria-label="FAQ Visual Content"
      >
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  aria-hidden={activeTab !== tab.id}
                >
                  <img
                    src={tab.image || "/placeholder.svg"}
                    alt={`Ilustración para la pregunta: ${tab.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-md"
                    aria-label="Logo identificador"
                  >
                    ELPHA.ID
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Right side - Tabs */}
      <div
        className="w-full md:w-1/2 p-6"
        role="tablist"
        aria-label="Preguntas frecuentes"
      >
        <div className="space-y-4">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className="border-b border-gray-200 pb-4 last:border-0"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              <button
                onClick={() => setActiveTab(tab.id)}
                className="w-full text-left"
                aria-expanded={activeTab === tab.id}
                tabIndex={0}
              >
                <div className="flex items-start">
                  <span
                    className="text-sm font-medium text-gray-500 mr-3"
                    aria-hidden="true"
                  >
                    {tab.number}.
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-gray-900">
                      {tab.title}
                    </h3>

                    <AnimatePresence>
                      {activeTab === tab.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                          role="tabpanel"
                          id={`panel-${tab.id}`}
                          aria-labelledby={`tab-${tab.id}`}
                        >
                          <p className="mt-2 text-sm text-gray-600">
                            {tab.content}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

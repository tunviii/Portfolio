import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Activity, Cpu, Server, Database, Globe, ArrowRight, ShieldCheck, Zap, FileText } from "lucide-react";

interface VisualizerProps {
  projectKey: string;
}

export default function ProjectVisualizer({ projectKey }: VisualizerProps) {
  switch (projectKey) {
    case "prepforge":
      return <PrepForgeVisualizer />;
    case "wokroll":
  return <WokRollVisualizer />;
    case "wellness":
  return <BehavioralAnalysisVisualizer />;
    default:
      return (
        <div className="w-full h-full bg-highlight-bg rounded-lg flex items-center justify-center p-6 text-muted-text">
          <Database className="w-12 h-12 stroke-1" />
        </div>
      );
  }
}

// Visualizer for AetherFlow: Multi-Agent node graph with animated pulses
function PrepForgeVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 sm:h-72 md:h-80 bg-white border border-border rounded-xl shadow-premium p-3 sm:p-4 md:p-6 flex flex-col overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#AEBBD8_1px,transparent_1px)] bg-size-[16px_16px] opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/40 pb-2 sm:pb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[9px] sm:text-xs text-heading font-semibold">
            prepforge_interview_engine
          </span>
        </div>

        <span className="text-[8px] sm:text-[10px] font-mono text-success-accent">
          ACTIVE
        </span>
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-between px-1 sm:px-2 gap-1 sm:gap-0 overflow-x-auto sm:overflow-visible">
        {[
          { title: "Resume", icon: <FileText className="w-4 h-4" /> },
          { title: "Interview", icon: <Activity className="w-4 h-4" /> },
          { title: "Groq", icon: <Cpu className="w-4 h-4" /> },
          { title: "Dashboard", icon: <Database className="w-4 h-4" /> },
        ].map((item, index) => (
          <React.Fragment key={index}>
            <motion.div
              animate={{
                scale: activeStep === index ? 1.08 : 1,
                borderColor:
                  activeStep === index
                    ? "rgba(111,136,217,.9)"
                    : "rgba(174,187,216,.4)",
              }}
              className="relative bg-card-bg border-2 rounded-xl w-14 h-14 sm:w-20 sm:h-20 flex flex-col items-center justify-center gap-1 sm:gap-2 shrink-0"
            >
              <div
                className={`p-2 rounded-lg ${
                  activeStep === index
                    ? "bg-accent/15 text-accent"
                    : "bg-highlight-bg text-heading"
                }`}
              >
                {item.icon}
              </div>

              <span className="text-[7px] sm:text-[10px] font-display font-semibold text-center leading-tight">
                {item.title}
              </span>
            </motion.div>

            {index !== 3 && (
              <div className="relative flex-1 h-px mx-1 sm:mx-2 min-w-2">
                <div className="absolute inset-0 border-t border-dashed border-border" />

                {activeStep === index && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-accent"
                    animate={{
                      x: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 1.3,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-highlight-bg rounded-lg border border-border p-2 sm:p-3">
          <div className="text-[9px] sm:text-[10px] font-mono text-muted-text mb-1">
            ATS SCORE
          </div>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold text-heading"
          >
            {activeStep === 0 && "88"}
            {activeStep === 1 && "90"}
            {activeStep === 2 && "91"}
            {activeStep === 3 && "92"}
          </motion.div>
        </div>

        <div className="bg-highlight-bg rounded-lg border border-border p-2 sm:p-3">
          <div className="text-[9px] sm:text-[10px] font-mono text-muted-text mb-2">
            Interview Progress
          </div>

          <div className="w-full h-2 rounded-full bg-border overflow-hidden">
            <motion.div
              animate={{
                width: ["25%", "50%", "75%", "100%"][activeStep],
              }}
              transition={{
                duration: 0.4,
              }}
              className="h-full bg-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


function WokRollVisualizer() {
  const [step, setStep] = useState(0);

  const statuses = [
    "Order Placed",
    "Preparing",
    "Ready",
    "Collected"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % statuses.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 sm:h-72 md:h-80 bg-white border border-border rounded-xl shadow-premium relative overflow-hidden p-3 sm:p-4 md:p-6 flex flex-col">

      {/* Background Grid */}

      <div className="absolute inset-0 bg-[radial-gradient(#AEBBD8_1px,transparent_1px)] bg-size-[16px_16px] opacity-20" />

      {/* Header */}

      <div className="relative z-10 flex justify-between items-center border-b border-border/40 pb-2 sm:pb-3">

        <div className="flex items-center gap-2">

          <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-accent animate-pulse"/>

          <span className="font-mono text-[9px] sm:text-xs font-semibold text-heading">

            wok_roll_mobile

          </span>

        </div>

        <span className="text-[8px] sm:text-[10px] text-success-accent font-mono">

          ONLINE

        </span>

      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center relative z-10 gap-4 md:gap-0">

<div className="w-24 h-48 sm:w-32 sm:h-56 md:w-36 md:h-60 bg-card-bg border border-border rounded-3xl shadow-md overflow-hidden shrink-0">

    {/* Notch */}

    <div className="w-16 h-1.5 rounded-full bg-border mx-auto mt-2"/>

    <div className="p-2 sm:p-3 flex flex-col h-full">

        <div className="font-display font-bold text-heading text-[10px] sm:text-xs">

            🍜 Wok & Roll

        </div>

        <div className="text-[8px] sm:text-[9px] text-muted-text mb-2 sm:mb-3">

            Order #204

        </div>

        <div className="space-y-2">

            {[
                "Placed",
                "Preparing",
                "Ready",
                "Collected"
            ].map((item,index)=>(

                <motion.div

                    key={item}

                    animate={{
                        scale:step===index?1.04:1,
                        backgroundColor:
                            step===index
                            ?"rgba(111,136,217,.15)"
                            :"rgba(248,250,253,1)"
                    }}

                    className="rounded-lg border border-border p-1.5 sm:p-2 flex justify-between items-center"

                >

                    <span className="text-[8px] sm:text-[9px] font-medium">

                        {item}

                    </span>

                    <div
                        className={`
                        w-2 h-2 rounded-full
                        ${
                            step>index
                            ?"bg-success-accent"
                            :step===index
                            ?"bg-accent animate-pulse"
                            :"bg-border"
                        }
                        `}
                    />

                </motion.div>

            ))}

        </div>

    </div>

</div>

        <div className="flex-1 w-full md:w-auto pl-0 md:pl-6 flex flex-col justify-center gap-2 sm:gap-3">

<div className="bg-highlight-bg rounded-lg border border-border p-2 sm:p-3">

    <div className="text-[8px] sm:text-[10px] font-mono text-muted-text">

        ACTIVE USERS

    </div>

    <motion.div

        key={step}

        initial={{opacity:0,y:4}}

        animate={{opacity:1,y:0}}

        className="text-2xl font-bold font-display text-heading"

    >

        {["28","31","35","42"][step]}

    </motion.div>

</div>

<div className="bg-highlight-bg rounded-lg border border-border p-2 sm:p-3">

    <div className="text-[8px] sm:text-[10px] font-mono text-muted-text mb-2">

        Current Status

    </div>

    <span className="text-xs sm:text-sm font-semibold text-accent">

        {statuses[step]}

    </span>

</div>

</div>

</div>

    </div>
  );
}

// Visualizer for Optima: Telemetry analytics charts & optimization targets
function BehavioralAnalysisVisualizer() {
  const [page, setPage] = useState(0);

const insights = [
  "Exercise",
  "Sleep",
  "Stress",
  "Summary"
];

useEffect(() => {
  const interval = setInterval(() => {
    setPage((prev) => (prev + 1) % insights.length);
  }, 2500);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="w-full h-64 sm:h-72 md:h-80 bg-white border border-border rounded-xl shadow-premium p-3 sm:p-4 md:p-6 flex flex-col overflow-hidden relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#AEBBD8_1px,transparent_1px)] bg-size-[16px_16px] opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-border/40 pb-2 sm:pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
          <span className="font-mono text-[9px] sm:text-xs font-semibold text-heading">
            behavioral_analysis_dashboard
          </span>
        </div>

        <span className="text-[8px] sm:text-[10px] text-success-accent font-mono">
          400 Samples
        </span>
      </div>

      {/* Factors bar chart */}
      <div className="relative z-10 flex-1 flex flex-col justify-end min-h-0 py-2 sm:py-3">
        <span className="text-[9px] sm:text-[10px] font-mono text-muted-text mb-2">
          BEHAVIORAL FACTORS
        </span>

        <div className="flex items-end gap-2 sm:gap-3 h-10 sm:h-12">
          {[78, 62, 45, 88].map((value, index) => (
            <div key={index} className="flex-1 flex justify-center items-end h-full">
              <motion.div
                animate={{ height: `${value}%` }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4 sm:max-w-6 rounded-t bg-accent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Metric boxes */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        <div className="bg-highlight-bg rounded-lg border border-border p-2 sm:p-3">
          <div className="text-[9px] sm:text-[10px] font-mono text-muted-text mb-1">
            WELLNESS SCORE
          </div>

          <motion.div
            key={page}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-display font-bold text-heading"
          >
            {["72", "79", "84", "87"][page]}
          </motion.div>
        </div>

        <div className="bg-highlight-bg rounded-lg border border-border p-2 sm:p-3">
          <div className="text-[9px] sm:text-[10px] font-mono text-muted-text mb-1">
            KEY INSIGHT
          </div>

          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] sm:text-xs font-semibold text-accent leading-tight"
          >
            {[
              "Exercise ↑ wellness",
              "Sleep ↑ wellness",
              "Stress ↓ wellness",
              "Overall trend ↑",
            ][page]}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

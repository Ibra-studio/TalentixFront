"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// 1. Données pour les 30 derniers jours
const data30Days = [
  { date: "13 Avr", site: 0, email: 0, manuel: 0, sourcing: 0, cooptation: 0 },
  { date: "15 Avr", site: 3, email: 1, manuel: 0, sourcing: 1, cooptation: 0 },
  { date: "17 Avr", site: 0, email: 0, manuel: 1, sourcing: 0, cooptation: 0 },
  { date: "19 Avr", site: 1, email: 0, manuel: 0, sourcing: 2, cooptation: 0 },
  { date: "21 Avr", site: 3, email: 1, manuel: 0, sourcing: 0, cooptation: 0 },
  { date: "23 Avr", site: 0, email: 0, manuel: 0, sourcing: 1, cooptation: 0 },
  { date: "25 Avr", site: 2, email: 0, manuel: 1, sourcing: 0, cooptation: 0 },
  { date: "27 Avr", site: 0, email: 0, manuel: 0, sourcing: 0, cooptation: 0 },
  { date: "29 Avr", site: 1, email: 0, manuel: 0, sourcing: 0, cooptation: 0 },
  { date: "03 Mai", site: 0, email: 0, manuel: 0, sourcing: 0, cooptation: 0 },
  { date: "11 Mai", site: 0, email: 0, manuel: 0, sourcing: 0, cooptation: 0 },
];

// 2. Données pour les 7 derniers jours
const data7Days = [
  { date: "05 Mai", site: 1, email: 0, manuel: 0, sourcing: 1, cooptation: 0 },
  { date: "06 Mai", site: 2, email: 1, manuel: 0, sourcing: 0, cooptation: 0 },
  { date: "07 Mai", site: 0, email: 0, manuel: 1, sourcing: 2, cooptation: 0 },
  { date: "08 Mai", site: 3, email: 0, manuel: 0, sourcing: 0, cooptation: 1 },
  { date: "09 Mai", site: 1, email: 1, manuel: 0, sourcing: 1, cooptation: 0 },
  { date: "10 Mai", site: 0, email: 0, manuel: 0, sourcing: 0, cooptation: 0 },
  { date: "11 Mai", site: 2, email: 0, manuel: 0, sourcing: 1, cooptation: 0 },
];

// Configuration des canaux
const metricsConfig = [
  { key: "site", label: "Applied via careers site", color: "var(--color-brand)" },
  { key: "email", label: "Applied via email", color: "#3b82f6" },
  { key: "manuel", label: "Added manually", color: "#10b981" },
  { key: "sourcing", label: "Sourced", color: "#FE8A6A" },
  { key: "cooptation", label: "Referred", color: "#a3e635" },
];

export function CandidateChart() {
  const [range, setRange] = React.useState("30");
  const [activeMetric, setActiveMetric] = React.useState<string | null>(null);

  const activeData = range === "30" ? data30Days : data7Days;

  // Calcul automatique des totaux
  const computedMetrics = metricsConfig.map((metric) => {
    const total = activeData.reduce(
      (sum, item) => sum + (item[metric.key as keyof typeof item] as number || 0),
      0
    );
    return { ...metric, count: total };
  });

  // Gère le filtrage au clic
  const handleMetricToggle = (key: string) => {
    setActiveMetric((prev) => (prev === key ? null : key));
  };

  return (
    <Card className="bg-card w-full overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-medium">Candidats recrutés</CardTitle>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[160px] h-8 text-xs bg-background">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Les 30 derniers jours</SelectItem>
            <SelectItem value="7">Les 7 derniers jours</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      
      <CardContent className="pb-0 px-0">
        {/* Zone du Graphique */}
        <div className="h-[200px] w-full px-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/60" />
              <XAxis dataKey="date" className="text-[10px] fill-muted-foreground" tickLine={false} axisLine={false} />
              <YAxis className="text-[10px] fill-muted-foreground" tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)", borderRadius: "6px" }}
                itemStyle={{ fontSize: "11px" }}
                labelStyle={{ fontSize: "11px", fontWeight: "bold" }}
              />
              
              {metricsConfig.map((metric) => {
                // Si une métrique est sélectionnée, on masque complètement les autres
                const isHidden = activeMetric !== null && activeMetric !== metric.key;
                if (isHidden) return null;

                return (
                  <Area
                    key={metric.key}
                    type="monotone"
                    dataKey={metric.key}
                    stroke={metric.color}
                    strokeWidth={2}
                    fill={metric.color}
                    fillOpacity={0.06}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Barre d'indicateurs cliquables (Fidèle à image_1a171f.png) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 border-t border-border mt-6">
          {computedMetrics.map((item) => {
            const isSelected = activeMetric === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleMetricToggle(item.key)}
                className={cn(
                  "flex flex-col items-start text-left p-4 transition-all relative border-r last:border-r-0 border-border/30 hover:bg-muted/30 outline-none select-none",
                  isSelected && "bg-muted dark:bg-muted font-semibold"
                )}
              >
                <div className="flex items-center gap-2 w-full">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className={cn(
                    "text-xs text-muted-foreground font-medium truncate transition-colors",
                    isSelected && "text-foreground underline decoration-solid underline-offset-4"
                  )}>
                    {item.label}
                  </span>
                </div>
                <p className="text-xl font-bold mt-1.5 pl-4 text-foreground">{item.count}</p>
                
               
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
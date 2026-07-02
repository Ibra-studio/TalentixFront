// app/(landing)/layout.tsx
import { CareersFooter } from "@/components/careers/CareersFooter";
import { Bricolage_Grotesque, Geist } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",   // variable CSS qu'on utilisera dans le CSS
  weight: ["400", "500", "600", "700", "800"],
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  return (
    
    <div
      className={`${bricolage.variable} ${geist.variable}`}
    >
      {children}
      
    </div>
    
  );
}
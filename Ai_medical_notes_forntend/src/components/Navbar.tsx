import { Activity, Building2 } from "lucide-react";

const Navbar = () => (
  <header className="border-b border-border bg-card">
    <div className="container mx-auto flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-2">
        <Activity className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold text-primary">VoiceRx</span>
      </div>
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Dr. Demo User</span>
        <span className="flex items-center gap-1.5">
          <Building2 className="h-4 w-4" />
          General Hospital
        </span>
      </div>
    </div>
  </header>
);

export default Navbar;

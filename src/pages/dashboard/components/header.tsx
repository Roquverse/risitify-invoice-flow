
import { Settings, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiInvoiceDialog } from "@/components/invoice/ai-invoice-dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileNav } from "@/hooks/use-mobile-nav";

interface DashboardHeaderProps {
  collapsed?: boolean;
}

export function DashboardHeader({ collapsed = false }: DashboardHeaderProps) {
  const isMobile = useIsMobile();
  const mobileNav = useMobileNav();

  return (
    <header 
      className={`fixed top-0 right-0 left-0 ${
        isMobile ? "" : collapsed ? "md:left-20" : "md:left-64"
      } h-16 border-b bg-white flex items-center justify-between px-4 z-20 transition-all duration-300`}
    >
      <div className="flex items-center gap-6">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={mobileNav.toggle}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <AiInvoiceDialog />
        <span className="text-sm text-gray-600 hidden md:inline">
          Trial expires in 27 days
        </span>
        <Button
          className="text-[#153f32] hover:text-[#1B4D3E] font-medium hidden md:inline-flex"
          variant="link"
        >
          Subscribe
        </Button>
        <div className="h-6 w-[1px] bg-gray-200 hidden md:block"></div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-[#153f32] hover:bg-gray-100"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-[#153f32] hover:bg-gray-100 hidden md:inline-flex"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-[#153f32] text-white flex items-center justify-center text-sm font-medium">
          AI
        </div>
      </div>
    </header>
  );
}

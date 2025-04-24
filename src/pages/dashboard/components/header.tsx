import { Link } from "react-router-dom";
import { Search, Bell, Settings, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  collapsed: boolean;
}

export function DashboardHeader({ collapsed }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 z-20 flex h-16 items-center border-b border-gray-200 bg-white transition-all duration-300 ${
        collapsed ? "left-20" : "left-64"
      } right-0`}
    >
      <div className="flex flex-1 items-center px-4">
        <div className="relative flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Customers ( / )"
              className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            Trial expires in 13 days
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Subscribe Now
          </Button>

          <div className="h-5 w-px bg-gray-200" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Bell className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem className="text-sm">
                No new notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Settings className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem>
                <Link to="/dashboard/settings" className="flex w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 px-2 text-sm font-normal">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                Avatec Interactives
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-sm">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-5 w-px bg-gray-200" />

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Plus className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>
    </header>
  );
}

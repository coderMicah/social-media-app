import { Button } from "@/components/ui/button";
import { BellIcon, BookmarkIcon, HomeIcon, MailIcon } from "lucide-react";
import Link from "next/link";


interface IMenuBarProps {
  className?: string;
}

interface IMenuItem {
    name:string,
    title:string,
    icon:React.ReactNode,
    href:string
}

const menuItems:IMenuItem[]  = [
    {
        name:"Home",
        title:"Home",
        icon:<HomeIcon/>,
        href:"/"
    },
    {
        name:"Notifications",
        title:"Notifications",
        icon:<BellIcon/>,
        href:"/notifications"
    },
    {
        name:"Messages",
        title:"Messages",
        icon:<MailIcon/>,
        href:"/messages"
    },
    {
        name:"Bookmarks",
        title:"Bookmarks",
        icon:<BookmarkIcon/>,
        href:"/bookmarks"
    },
]

const MenuBar = ({ className }: IMenuBarProps) => {
  return (
    <div className={className}>

        {menuItems.map(item => (
            <Button
                variant="ghost"
                className="flex items-center justify-start gap-3"
                title={item.title}
                asChild
                key={item.name}
              >
                <Link href={item.href}>
                  {item.icon} <span className="hidden lg:inline">{item.name}</span>
                </Link>
              </Button>
        ))}
    </div>
    
  );
};

export default MenuBar;

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import {
    SheetClose, SheetContent,
    SheetFooter, SheetHeader, SheetTitle
} from "@/components/ui/sheet"
import { NavLink } from "react-router-dom"


export function SideBar() {
const { ts } = useLanguage();
    
    return (
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle> Menu </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-3 p-4">
                <SheetClose asChild>
                    <NavLink to="/">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            {ts("nav.home")}
                        </Button>
                    </NavLink>
                </SheetClose>

                <SheetClose asChild>
                    <NavLink to="/cv">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            {ts("nav.cv")}
                        </Button>
                    </NavLink>
                </SheetClose>

                <SheetClose asChild>
                    <NavLink to="/techstacks">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            Tech-Stacks
                        </Button>
                    </NavLink>
                </SheetClose>

                <SheetClose asChild>
                    <NavLink to="/projects">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            {ts("nav.projects")}
                        </Button>
                    </NavLink>
                </SheetClose>

                <SheetClose asChild>
                    <NavLink to="/contact">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            Contact
                        </Button>
                    </NavLink>
                </SheetClose>
            </div>

            <SheetFooter>
                <SheetClose asChild>
                    <NavLink to="/pilot">
                        <Button variant="outline" className="w-full">
                            Admin
                        </Button>
                    </NavLink>
                </SheetClose>

                <SheetClose asChild>
                    <Button variant="outline"> {ts("nav.close_sidebar")} </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}

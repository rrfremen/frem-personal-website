import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import {
    SheetClose, SheetContent,
    SheetFooter, SheetHeader, SheetTitle
} from "@/components/ui/sheet"
import { NavLink } from "react-router-dom"


export function SideBar() {
const { t } = useLanguage();
    
    return (
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle> Menu </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-3 p-4">
                <SheetClose asChild>
                    <NavLink to="/">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            {t("nav.home")}
                        </Button>
                    </NavLink>
                </SheetClose>
                <SheetClose asChild>
                    <NavLink to="/cv">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            {t("nav.cv")}
                        </Button>
                    </NavLink>
                </SheetClose>
                <SheetClose asChild>
                    <NavLink to="/projects">
                        <Button variant="ghost" className="w-full justify-start hover:bg-gray-100">
                            {t("nav.projects")}
                        </Button>
                    </NavLink>
                </SheetClose>
            </div>

            <SheetFooter>
                <SheetClose asChild>
                    <Button variant="outline"> Close </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    )
}

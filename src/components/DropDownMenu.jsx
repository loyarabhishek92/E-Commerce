import { BadgeCheckIcon, BellIcon, CreditCardIcon, ListOrdered, LogOutIcon, SettingsIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { Button } from "./ui/button.jsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu.jsx";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/features/user/userSlice.js";
import { base } from "@/app/mainApi.js";


const adminItems = [
    {
        icon: BadgeCheckIcon,
        property: 'My account'
    },
    {
        icon: UserIcon,
        property: 'Profile'
    },
    {
        icon: SettingsIcon,
        property: 'Admin Panel'
    },
    {
        icon: ListOrdered,
        property: 'Orders'
    },
    {
        icon: BellIcon,
        property: 'Notifications'
    }
];



const userItems = [
    {
        icon: BadgeCheckIcon,
        property: 'My account'
    },
    {
        icon: UserIcon,
        property: 'Profile'
    },
    {
        icon: ShoppingBagIcon,
        property: 'Cart'
    },
    {
        icon: ListOrdered,
        property: 'Orders'
    },
    {
        icon: BellIcon,
        property: 'Notifications'
    }
];

export default function DropDownMenu({ user }) {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const litsItems = user.role === 'admin' ? adminItems : userItems;


    const logOut = () => {
        dispatch(removeUser());
        nav('/');
    }



    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar>
                            <AvatarImage src={`${base}/${user.image}`} alt={user.fallback} />
                            <AvatarFallback>LF</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        {litsItems.map((item, index) => (
                            <DropdownMenuItem
                                onClick={() => {
                                    switch (item.property) {
                                        case 'Profile':
                                            nav('/profile');
                                            break;

                                        case 'Admin Panel':
                                            nav('/admin');
                                            break;

                                        case 'Cart':
                                            nav('/cart');
                                            break;

                                        case 'Orders':
                                            nav('/orders');
                                            break;

                                        default:
                                            break;
                                    }
                                }}

                                key={index}>
                                <item.icon />
                                <span className="text-popover-foreground">{item.property}</span>
                            </DropdownMenuItem>
                        ))}

                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={logOut}
                        
                        
                    >
                        <LogOutIcon />
                        Sign Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

import {
    Camera,
    ChevronDown,
    LogOut,
    Mail,
    Settings,
    User
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileDropdown() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [open,setOpen]=useState(false);

    function signOut(){
        logout();
        navigate("/");
    }

    return(

<div className="relative">

<button
onClick={()=>setOpen(!open)}
className="flex items-center gap-3 rounded-2xl border bg-white px-2 py-2 shadow-sm">

<img
src={
user?.profileImage ||
`https://ui-avatars.com/api/?background=059669&color=fff&name=${user?.fullName}`
}
className="h-11 w-11 rounded-full object-cover"
/>

<div className="hidden text-left md:block">

<p className="font-semibold">
{user?.fullName}
</p>

<p className="text-xs text-slate-500">
{user?.role}
</p>

</div>

<ChevronDown size={18}/>

</button>

{open &&(

<div className="absolute right-0 mt-4 w-80 overflow-hidden rounded-3xl border bg-white shadow-2xl">

<div className="border-b p-6">

<div className="flex flex-col items-center">

<div className="relative">

<img
src={
user?.profileImage ||
`https://ui-avatars.com/api/?background=059669&color=fff&name=${user?.fullName}`
}
className="h-28 w-28 rounded-full object-cover"
/>

<button
className="absolute bottom-0 right-0 rounded-full bg-emerald-600 p-2 text-white">

<Camera size={16}/>

</button>

</div>

<h2 className="mt-4 text-xl font-bold">
{user?.fullName}
</h2>

<p className="text-slate-500">
{user?.email}
</p>

<span className="mt-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
{user?.role}
</span>

</div>

</div>

<div className="p-3">

<button
onClick={()=>navigate("/profile")}
className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100">

<User size={18}/>

My Profile

</button>

<button
className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100">

<Settings size={18}/>

Settings

</button>

<button
onClick={signOut}
className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50">

<LogOut size={18}/>

Sign Out

</button>

</div>

</div>

)}

</div>

    )

}
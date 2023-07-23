import { Icons } from "../enums/tabs-icons.enum";
import { Roles } from "../../enums/roles.enum";
import { ModulesPaths, ComponentsPaths } from "../../enums/routes-paths.enum";
import { topnavTabs } from "../interfaces/topnav-tabs.interface";

export const TOPNAV_USER_TABS: topnavTabs[] = [
  {
    index: 0,
    module: ModulesPaths.ORDER,
    component: ComponentsPaths.MENU,
    name: 'Menu',
    icon: Icons.Order,
    role: Roles.USER
  },
  {
    index: 1,
    module: ModulesPaths.BILL,
    component: ComponentsPaths.LIST,
    name: 'Bills',
    icon: Icons.Bill,
    role: Roles.USER
  }
];

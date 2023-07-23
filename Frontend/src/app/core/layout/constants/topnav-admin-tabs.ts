import { Icons } from "../enums/tabs-icons.enum";
import { Roles } from "../../enums/roles.enum";
import { ComponentsPaths, ModulesPaths } from "../../enums/routes-paths.enum";
import { topnavTabs } from "../interfaces/topnav-tabs.interface";

export const TOPNAV_ADMIN_TABS: topnavTabs[] = [
  {
    index: 0,
    module: ModulesPaths.DASHBOARD,
    component: ComponentsPaths.STATISTICS,
    name: 'Dashboard', icon: Icons.Dashboard,
    role: Roles.ADMIN
  },
  {
    index: 1,
    module: ModulesPaths.MANAGEMENT,
    component: ComponentsPaths.CATEGORY,
    name: 'Categories',
    icon: Icons.Category,
    role: Roles.ADMIN
  },
  {
    index: 2,
    module: ModulesPaths.MANAGEMENT,
    component: ComponentsPaths.PRODUCT,
    name: 'Products',
    icon: Icons.Product,
    role: Roles.ADMIN
  },
  {
    index: 3,
    module: ModulesPaths.MANAGEMENT,
    component: ComponentsPaths.USER,
    name: 'Users',
    icon: Icons.User,
    role: Roles.ADMIN
  },
  {
    index: 4,
    module: ModulesPaths.BILL,
    component: ComponentsPaths.LIST,
    name: 'Orders',
    icon: Icons.Bill,
    role: Roles.ADMIN
  },
];


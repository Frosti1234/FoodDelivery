import { Icons } from "../enums/tabs-icons.enum";
import { Roles } from "../../enums/roles.enum";
import { ComponentsPaths, ModulesPaths } from "../../enums/routes-paths.enum";

export type TabName = 'Dashboard' | 'Categories' | 'Products' | 'Menu' | 'Users' | 'Bills' | 'Orders';

export interface topnavTabs {
  index: number;
  module: ModulesPaths;
  component: ComponentsPaths;
  role: Roles;
  name: TabName;
  icon: Icons;
}

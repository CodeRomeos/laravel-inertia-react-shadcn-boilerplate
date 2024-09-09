import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/shadcn/ui/navigation-menu";
import { Link } from '@inertiajs/react';
import { Package2 } from 'lucide-react';
import { cn } from '@/shadcn';

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default function Nav() {
  return (
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <NavigationMenu>
              <NavigationMenuList>
                  <NavigationMenuItem>
                      <NavigationMenuTrigger>
                          Getting started
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                          <ul className="bg-white grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                              <li className="row-span-3">
                                  <NavigationMenuLink asChild>
                                      <a
                                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                          href="/"
                                      >
                                          <Package2 className="h-6 w-6" />
                                          <div className="mb-2 mt-4 text-lg font-medium">
                                              shadcn/ui
                                          </div>
                                          <p className="text-sm leading-tight text-muted-foreground">
                                              Beautifully designed components
                                              that you can copy and paste into
                                              your apps. Accessible.
                                              Customizable. Open Source.
                                          </p>
                                      </a>
                                  </NavigationMenuLink>
                              </li>
                              <ListItem href="/docs" title="Introduction">
                                  Re-usable components built using Radix UI and
                                  Tailwind CSS.
                              </ListItem>
                              <ListItem
                                  href="/docs/installation"
                                  title="Installation"
                              >
                                  How to install dependencies and structure your
                                  app.
                              </ListItem>
                              <ListItem
                                  href="/docs/primitives/typography"
                                  title="Typography"
                              >
                                  Styles for headings, paragraphs, lists...etc
                              </ListItem>
                          </ul>
                      </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                      <NavigationMenuContent>
                          <ul className="bg-white grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">

                                  <ListItem
                                      title={'alskdfj'}
                                      href={'#'}
                                  >
                                      dasldkfjasdlkfj
                                  </ListItem>

                          </ul>
                      </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <Link href="/docs" legacyBehavior passHref>
                          <NavigationMenuLink
                              className={navigationMenuTriggerStyle()}
                          >
                              Documentation
                          </NavigationMenuLink>
                      </Link>
                  </NavigationMenuItem>
              </NavigationMenuList>
          </NavigationMenu>
      </nav>
  );
}

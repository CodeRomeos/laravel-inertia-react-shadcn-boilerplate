import React from 'react'
import { Button } from "@/shadcn/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import { PanelTopIcon } from 'lucide-react';

export default function MainSiteIconLink() {
  return (
      <TooltipProvider>
          <Tooltip>
              <TooltipTrigger asChild>
                  <Button asChild variant="ghost" size="icon">
                      <a href="/" target="_blank">
                          <PanelTopIcon size="18" />
                      </a>
                  </Button>
              </TooltipTrigger>
              <TooltipContent>
                  <p>View main site</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>
  );
}

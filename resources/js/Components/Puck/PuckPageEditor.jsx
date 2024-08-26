import React from 'react'
import { PuckEditor, viewports } from "../Puck/PuckEditor";
import { config } from "../Puck/config";
import { overrides } from "../Puck/PuckEditor";
import { Puck, usePuck } from "@measured/puck";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { Button } from '@/shadcn/ui/button';

export default function PuckPageEditor({onChange, value, title = "Page Builder"}) {
    const [showVisualEditor, showVisualEditorSet] = React.useState(false);
    const [scale, scaleSet] = React.useState(1);

    const [puckTabValue, puckTabValueSet] = React.useState("blocks");
    const [selectedItem, selectedItemSet] = React.useState(null);

    const [selectedViewport, selectedViewportSet] = React.useState(
        viewports[2]
    );

    const PuckEvents = ({ onSelect }) => {
        const { appState, selectedItem } = usePuck();
        const [currentSelectedItem, currentSelectedItemSet] =
            React.useState(null);

        React.useMemo(() => {
            if (
                selectedItem != null &&
                JSON.stringify(selectedItem) !=
                    JSON.stringify(currentSelectedItem)
            ) {
                currentSelectedItemSet(selectedItem);
                onSelect(selectedItem);
            }
        }, [
            JSON.stringify(currentSelectedItem) != JSON.stringify(selectedItem),
        ]);

        return <></>;
    };

  return (
      <div>
          <Puck
              config={config}
              overrides={overrides}
              data={value || {}}
              headerTitle={title ?? "Page Builder"}
              onChange={(d) => {
                  // puckTabValueSet('fields');
                  onChange(d);
              }}
              iframe={{
                  enabled: false,
              }}
              // dnd={{
              //     onBeforeCapture: (a, b) => {
              //         console.log("onBeforeCapture", a, b);
              //     },
              // }}

              // onPublish={(d) => {
              //     // submit form
              //     formEl?.current.dispatchEvent(
              //         new Event("submit", {
              //             cancelable: true,
              //             bubbles: true,
              //         })
              //     );
              // }}
          >
              <PuckEvents
                  onSelect={(item) => {
                      if (
                          item != null &&
                          JSON.stringify(item) != JSON.stringify(selectedItem)
                      ) {
                          selectedItemSet(item);
                          puckTabValueSet("fields");
                      }
                  }}
              />
              <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-9 space-y-4">
                      <div className="bg-gray-100 p-4 rounded-md">
                          {/* Responsive buttons */}
                          <div className="pb-4">
                              <div className="flex items-center justify-center gap-2">
                                  {viewports.map((viewport) => (
                                      <Button
                                          key={viewport.width}
                                          type="button"
                                          variant="outline"
                                          size="icon"
                                          onClick={() => {
                                              selectedViewportSet(viewport);
                                          }}
                                      >
                                          {viewport.icon}
                                      </Button>
                                  ))}
                              </div>
                          </div>
                          <div className="h-screen overflow-y-auto py-4">
                              <div className="flex items-center justify-center">
                                  <div
                                      className="h-full border bg-white min-h-96 transition-all"
                                      style={{
                                          // transform: `scale(${scale})`,
                                          width: selectedViewport.width,
                                      }}
                                  >
                                      <Puck.Preview />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-span-3 space-y-4">
                      <Tabs
                          defaultValue="blocks"
                          value={puckTabValue}
                          onValueChange={puckTabValueSet}
                      >
                          <TabsList className="grid grid-cols-3">
                              <TabsTrigger value="fields">Fields</TabsTrigger>
                              <TabsTrigger value="blocks">Blocks</TabsTrigger>
                              <TabsTrigger value="outline">Outline</TabsTrigger>
                          </TabsList>
                          <TabsContent value="fields">
                              <div className="border rounded-md max-h-[600px] overflow-y-scroll">
                                  {selectedItem && (
                                      <h4 className="p-4 text-lg">
                                          {selectedItem.type}
                                      </h4>
                                  )}
                                  <Puck.Fields />
                              </div>
                          </TabsContent>
                          <TabsContent value="blocks" className="space-y-4">
                              {/* <div className="border rounded-md max-h-[380px] overflow-y-scroll">
                                        <Puck.Fields />
                                    </div> */}
                              <div className="bg-slate-100 p-2">
                                  <h5 className="m-2">Components</h5>
                                  <div className="max-h-[600px] overflow-y-scroll">
                                      <Puck.Components />
                                  </div>
                              </div>
                          </TabsContent>
                          <TabsContent value="outline">
                              <Puck.Outline />
                          </TabsContent>
                      </Tabs>
                  </div>
              </div>
          </Puck>
      </div>
  );
}

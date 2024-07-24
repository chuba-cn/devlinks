"use client";
import AddLink from "@/components/form/AddLink";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import PhoneMockUp from "@/components/svg/PhoneMockUp";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { deleteLinks, saveLinks } from "@/actions/link.action";
import { platform } from "@/lib/data";
import SubmitButton from "../form/SubmitButton";

const Base_X = 35;
const Base_Y = 278;

export type link = {
  id: number;
  linkId: string;
  platform: {
    name: string;
    icon: React.ReactNode;
    priority: number;
    egLink: string;
    brandColor: string;
    mockUpIcon: React.ReactNode;
    coordinates: {
      x: number | string;
      y: number | string;
    };
  };
  url: string;
};

function LinkMain({ links }: { links: link[] }) {
  const [trash, setTrash] = useState<link[] | null>(null);
  const [stagedTrash, setStagedTrash] = useState<link[] | null>(null);
  const [activeLink, setActiveLink] = useState<link | null>(null);
  const [coordinates, setCoordinates] = useState<{
    x: string | number;
    y: string | number;
  }>({ x: Base_X, y: Base_Y });
  const [newLinks, setNewLinks] = useState<link[] | null>(links);

  const [state, setState] = useState({ errors: [{}] });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const changedLinks = newLinks?.map((l) => l.platform.name);

    if (stagedTrash && stagedTrash.length > 0) {
      const restore = stagedTrash.filter(
        (l) => !changedLinks?.includes(l.platform.name)
      );

      setStagedTrash(restore.length > 0 ? restore : null);
    }

    const l =
      links &&
      links?.filter((link) => !changedLinks?.includes(link.platform.name));
    if (l && l?.length > 0) {
      if (changedLinks && changedLinks.length === 0) {
        setTrash(l);
        setStagedTrash(null);
      } else {
        setStagedTrash((prev) => {
          if (prev) {
            const previousPlatforms = prev.map((p) => p.platform.name);
            const filteredRepeatedLnks = l.filter(
              (link) => !previousPlatforms.includes(link.platform.name)
            );
            return [...prev, ...filteredRepeatedLnks];
          }
          return l;
        });
      }
    }

    if (newLinks && newLinks.length > 0) {
      if (newLinks.length === links?.length) {
        setCoordinates((prev) => {
          return {
            ...prev,
            y:
              parseInt(
                newLinks[newLinks.length - 1].platform.coordinates.y as string
              ) + 64,
          };
        });
        return;
      }
      const y = newLinks.length * 64 + 278;
      if (coordinates.y !== y)
        setCoordinates((prev) => {
          return { ...prev, y: (prev.y as string) + 64 };
        });
    } else {
      setCoordinates({ x: Base_X, y: Base_Y });
    }
  }, [JSON.stringify(newLinks)]);

  useEffect(() => {
    async function handleDelete() {
      if (trash) {
        const trashItems = trash.map((item) => item.linkId);
        const res = await deleteLinks(trashItems);
      }
    }

    handleDelete().then(() => {
      setTrash(null);
    });
  }, [trash?.length]);

  const items = useMemo(() => {
    if (newLinks) {
      return newLinks.map((item) => {
        return item.id;
      });
    }
  }, [JSON.stringify(newLinks)]);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "link") {
      setActiveLink(event.active.data.current.link);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeLinkId = active.id;
    const overLinkId = over.id;

    if (activeLinkId === overLinkId) return;

    setNewLinks((links) => {
      if (links) {
        const activeLinkIndex = links?.findIndex(
          (link) => link.id === activeLinkId
        );

        const overLinkindex = links?.findIndex(
          (link) => link.id === overLinkId
        );

        let y = Base_Y;

        return arrayMove(links, activeLinkIndex, overLinkindex).map(
          (link, index) => {
            let links = {
              ...link,
              platform: {
                ...link.platform,
                priority: index + 1,
                coordinates: {
                  ...link.platform.coordinates,
                  y,
                },
              },
            };

            y = y + 64;

            return links;
          }
        );
      }
      return links;
    });
  }

  return (
    <main className="flex-1 md:grid md:grid-cols-5 md:gap-4 p-4 bg-[#FAFAFA]/50">
      <section className="md:flex hidden md:col-span-2 items-start justify-center bg-white md:flex-1">
        <div className="mt-20">
          <PhoneMockUp links={newLinks} color="" />
        </div>
      </section>
      <section className="flex-1 flex md:col-span-3 bg-white">
        <div className="p-6 flex-col flex flex-1">
          <h2 className="heading-m text-darkgrey">Customize your links</h2>
          <p className="body-m text-grey mt-2">
            {
              "Add/edit/remove links below and then share all your profiles with the world!"
            }
          </p>
          <div className="flex mt-8">
            <Button
              variant={"outline"}
              className="w-full"
              disabled={newLinks ? newLinks.length === platform.length : false}
              onClick={() => {
                if (newLinks && newLinks?.length > 0) {
                  setNewLinks([
                    ...newLinks,
                    {
                      id: newLinks[newLinks.length - 1].platform.priority + 1,
                      linkId: "",
                      platform: {
                        name: "",
                        icon: "",
                        priority:
                          newLinks[newLinks.length - 1].platform.priority + 1,
                        egLink: "",
                        brandColor: "",
                        mockUpIcon: "",
                        coordinates: { x: coordinates.x, y: coordinates.y },
                      },
                      url: "",
                    },
                  ]);
                } else {
                  setNewLinks([
                    {
                      id:
                        links && links.length > 0
                          ? links[links.length - 1].platform.priority + 1
                          : 1,
                      linkId: "",
                      platform: {
                        name: "",
                        icon: "",
                        priority:
                          links && links.length > 0
                            ? links[links.length - 1].platform.priority + 1
                            : 1,
                        egLink: "",
                        brandColor: "",
                        mockUpIcon: "",
                        coordinates: { x: coordinates.x, y: coordinates.y },
                      },
                      url: "",
                    },
                  ]);
                }
              }}
            >
              + Add new link
            </Button>
          </div>

          {(!newLinks || newLinks?.length === 0) && (
            <article className="py-[46px] px-5 flex flex-col items-center justify-center h-full mt-6 sm:px-[76px] bg-[#FAFAFA]">
              <Image
                src={"/assets/images/illustration-empty.svg"}
                width={124}
                height={80}
                className="h-[80px] w-[124px]"
                alt="a hand scrolling on mobile phone"
              />
              <h2 className="heading-m text-darkgrey mt-4">
                {"Let's get you started"}
              </h2>
              <p className="text-grey text-justify mt-4 sm:text-center">
                {
                  'Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We\'re here to help you share your profiles with everyone!'
                }
              </p>
            </article>
          )}
          <form
            className="flex-1 flex flex-col gap-4"
            action={async (formData: FormData) => {
              const state = await saveLinks(formData);
              console.log(state);
              if (state) {
                setState(state);
                setTrash(stagedTrash);
                setStagedTrash(null);
              }
            }}
          >
            {newLinks && newLinks?.length > 0 && (
              <DndContext
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                sensors={sensors}
              >
                <div>
                  <SortableContext items={items as number[]}>
                    {newLinks &&
                      newLinks.map((link, index) => (
                        <AddLink
                          setCoordinates={setCoordinates}
                          setStagedTrash={setStagedTrash}
                          state={state}
                          trash={trash}
                          index={index + 1}
                          links={newLinks}
                          link={link}
                          key={link.id}
                          id={link.id}
                          platform={platform}
                          setNewLinks={setNewLinks}
                        />
                      ))}
                  </SortableContext>
                </div>
              </DndContext>
            )}

            <div className="flex mt-auto py-8 border-t">
              <SubmitButton
                className="w-full sm:w-auto sm:ml-auto sm:px-6 sm:h-10"
                disable={!!newLinks && newLinks.length > 0 ? false : true}
                label="Save"
                pendingLabel="Saving..."
              />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LinkMain;
